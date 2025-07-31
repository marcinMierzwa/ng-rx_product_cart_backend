import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //http://localhost:3000/product

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const createdProduct =
      await this.productService.createProduct(createProductDto);
    return {
      data: createdProduct,
    };
  }

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();
    return {
      data: products,
    };
  }

  @Get(':id')
  async getProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const product = await this.productService.getProduct(id);
    return {
      data: product
    }
  }

  //---------seeding data base------------

  // @Post('many')
  // async createMany(
  //   @Body(new ParseArrayPipe({ items: CreateProductInputDto }))
  //   createProductsDto: CreateProductInputDto[],
  // ) {
  //   return this.productService.createMany(createProductsDto);
  // }
}
