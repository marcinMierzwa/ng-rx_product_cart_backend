import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetProductsQueryDto {
  @IsOptional()
  @IsInt({ message: 'Page must be an integer.' })
  @Type(() => Number)
  @Min(1, { message: 'Page number cannot be less than 1.' })
  readonly page?: number = 1; //skip

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer.' })
  @Type(() => Number)
  @Min(1, { message: 'Limit number cannot be less than 1.' })
  @Max(50, { message: 'Limit number cannot be greater than 100.' })
  readonly pageSize?: number = 20; // page size

  @IsOptional()
  @IsString({ message: 'Search term must be a string.' })
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly search?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID v4.' })
  readonly categoryId?: string;

  @IsOptional()
  @IsIn(['createdAt', 'price', 'title', 'ratingRate'])
  readonly sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsString()
  @IsIn(['all', 'bestsellers', 'byCategory'])
  readonly displayMode?: string = 'all';
}
