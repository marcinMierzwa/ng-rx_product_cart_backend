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
import { CreateProductInputDto } from './dto/create-product-input.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //http://localhost:3000/product

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CreateOne(@Body() createProductDto: CreateProductInputDto) {
    const createdProduct =
      await this.productService.createOne(createProductDto);
    return {
      data: createdProduct,
    };
  }

  @Get()
  async GetAll() {
    const products = await this.productService.getAll();
    return {
      data: products,
    };
  }

  @Get(':id')
  async GetOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const product = await this.productService.getOne(id);
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
