import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../core/database/database.service';
import { CreateCategoryResponseDto } from './dto/create-category-output.dto';
import { CreateCategoryDto } from './dto/create-category-input.dto';
import { GetCategoryResponseDto } from './dto/get-category-output.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async createCategory(
    createCategorDto: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto> {
    return await this.dataBaseService.category.create({
      data: createCategorDto,
    });
  }

  async getCategories(): Promise<GetCategoryResponseDto[]> {
    const categories = await this.dataBaseService.category.findMany({});
    if (!categories || categories.length === 0)
      throw new NotFoundException('Categories not found');
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }
}
