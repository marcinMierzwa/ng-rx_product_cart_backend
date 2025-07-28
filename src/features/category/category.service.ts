import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateCategoryOutputDto } from './dto/create-category-output.dto';
import { CreateCategoryInputDto } from './dto/create-category-input.dto';
import { GetCategoryOutputDto } from './dto/get-category-outpur.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async createOne(
    createCategorDto: CreateCategoryInputDto,
  ): Promise<CreateCategoryOutputDto> {
    const newCategory = await this.dataBaseService.category.create({
      data: createCategorDto,
    });
    return {
        ...newCategory,
        id: newCategory.id.toString()
    }
  }

  async getAll(): Promise<GetCategoryOutputDto[]> {
    const categories = await this.dataBaseService.category.findMany({});
    if(!categories || categories.length ===0) throw new NotFoundException('Categories not found');
    return categories.map((category) => ({
        ...category,
        id: category.id.toString()
    })) 
  }
}

