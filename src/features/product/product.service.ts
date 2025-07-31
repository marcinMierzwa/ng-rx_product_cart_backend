import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductResponseDto } from './dto/create-product-output.dto';
import { GetProductResponseDto } from './dto/get-product.output.dto';

@Injectable()
export class ProductService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
     return await this.dataBaseService.product.create({
      data: createProductDto,
    });
  }

  async getProducts(): Promise<GetProductResponseDto[]> {
    const products = await this.dataBaseService.product.findMany({
      include: {
        category: true,
      },
    });
    if (!products || products.length === 0)
      throw new NotFoundException('Products not found');
    return products.map((product) => {
      const { category, ...restOfProduct } = product;
      return {
        ...restOfProduct,
        category: category
          ? {
              id: category.id,
              name: category.name,
            }
          : undefined,
      };
    });
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
    return {
      ...product,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
          }
        : undefined,
    };
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
}
