import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //http://localhost:3000/products

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto) {    
    return await this.productService.createProduct(createProductDto);
  }

  //http://localhost:3000/products?page=2&search=Green Panel Tee
  @Get()
  async getProducts(@Query() query: GetProductsQueryDto) {
     return await this.productService.getProducts(query);
  }

  @Get(':id')
  async getProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.productService.getProduct(id);
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

