import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryInputDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'The category name must be at least 3 characters long' })
  @MaxLength(200, { message: 'The category name cannot be longer than 200 characters' })
  name: string;

}
