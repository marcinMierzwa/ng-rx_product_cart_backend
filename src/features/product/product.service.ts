import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateProductInputDto } from './dto/create-product-input.dto';
import { CreateProductOutputDto } from './dto/create-product-output.dto';
import { GetProductOutputDto } from './dto/get-product.output.dto';

@Injectable()
export class ProductService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async createOne(
    createProductDto: CreateProductInputDto,
  ): Promise<CreateProductOutputDto> {
    const newProduct = await this.dataBaseService.product.create({
      data: createProductDto,
      //   include: {
      //     category: true,
      //   },
    });
    return {
      ...newProduct,
      id: newProduct.id.toString(),
    };
  }

  async getAll(): Promise<GetProductOutputDto[]> {
    const products = await this.dataBaseService.product.findMany({
      include: {
        category: true,
      },
    });
    if (!products || products.length === 0)
      throw new NotFoundException('Products not found');
    return products.map((product) => {
      // pull off all category object
      const { category, ...restOfProduct } = product;

      // return rest of product fields and add brushed up category
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
}
