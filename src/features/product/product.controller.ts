import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
        data: createdProduct
      };
    }

    @Get()
      async GetAll() {
        const products = await this.productService.getAll();
        return {
          data: products
        } 
      }
}
