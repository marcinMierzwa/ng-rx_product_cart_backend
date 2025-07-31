import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-input.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //http://localhost:3000/category

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory =
      await this.categoryService.createCategory(createCategoryDto);
    return {
      data: createdCategory
    };
  }

  @Get()
  async getCategories() {
    const categories = await this.categoryService.getCategories();
    return {
      data: categories
    } 
  }
}
