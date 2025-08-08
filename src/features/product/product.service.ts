import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../core/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponseDto } from './dto/create-product-output.dto';
import { GetProductResponseDto } from './dto/get-product.output.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    return await this.dataBaseService.product.create({
      data: createProductDto,
      include: { category: true },
    });
  }

  async getProducts(
    query: GetProductsQueryDto,
  ): Promise<PaginatedResponseDto<GetProductResponseDto>> {
    const {
      page,
      pageSize,
      search,
      categoryId,
      sortBy,
      sortOrder,
      displayMode,
    } = query;

    const skip = (page - 1) * pageSize;

    const where: Prisma.ProductWhereInput = {};

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    if (search) {
      where.title = {
        contains: search, // 'contains' looks for a substring
        mode: 'insensitive', // 'insensitive' makes the search case-insensitive (like ILIKE in SQL)
      };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Execute TWO database queries concurrently in a single transaction for optimization.
    // Using `Promise.all` or `$transaction` runs them in parallel, which is faster.
    const [products, totalItemsFromDb] =
      await this.dataBaseService.$transaction([
        // First query: get the list of products for the current page
        this.dataBaseService.product.findMany({
          skip, // Skip X records
          take: pageSize, // Take Y records
          where, // Apply our dynamic filters
          include: {
            category: true, // Include the related category data
          },
          orderBy,
        }),
        // Second query: count ALL products matching the filters (without pagination)
        this.dataBaseService.product.count({ where }),
      ]);

    let finalTotalItems = totalItemsFromDb;
    if (displayMode === 'bestsellers') {
      finalTotalItems = products.length < pageSize ? products.length : pageSize;
    }

    const mappedProducts = products.map((product) => {
      const { category, ...restOfProduct } = product;
      return {
        ...restOfProduct,
        categoryName: category?.name,
      };
    });
    return new PaginatedResponseDto(
      mappedProducts,
      finalTotalItems,
      page,
      pageSize,
    );
  }

  async getProduct(productId: string): Promise<GetProductResponseDto> {
    const product = await this.dataBaseService.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found.');
    const { category, ...restOfProduct } = product;
    const mappedProducts = {
      ...restOfProduct,
      categoryName: category?.name,
    };
    return mappedProducts;
  }
}
//---------seeding data base----------
//    async createMany(createProductsDto: CreateProductInputDto[]): Promise<{ count: number }> {
//     try {
//       const result = await this.dataBaseService.product.createMany({
//         data: createProductsDto,
//         skipDuplicates: true,
//       });

//       return result;

//     } catch (error) {
//       if (error instanceof Prisma.PrismaClientKnownRequestError) {
//         if (error.code === 'P2002') {
//           throw new InternalServerErrorException(
//             'One or more products could not be created because of a duplicate title.',
//           );
//         }
//       }
//       throw new InternalServerErrorException('Could not create products.');
//     }
//   }
