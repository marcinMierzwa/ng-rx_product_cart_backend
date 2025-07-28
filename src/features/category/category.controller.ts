import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryInputDto } from './dto/create-category-input.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //http://localhost:3000/category

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async CreateOne(@Body() createCategoryDto: CreateCategoryInputDto) {
    const createdCategory =
      await this.categoryService.createOne(createCategoryDto);
    return {
      data: createdCategory
    };
  }

  @Get()
  async GetAll() {
    const categories = await this.categoryService.getAll();
    return {
      data: categories
    } 
  }
}
