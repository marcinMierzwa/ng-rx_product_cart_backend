import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsInt,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'The title must be at least 3 characters long' })
  @MaxLength(200, { message: 'The title cannot be longer than 200 characters' })
  title: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a correct number' },
  )
  @Min(0.01, { message: 'The price cannot be lower than 0.01 .' })
  @Max(10000, { message: 'The price cannot be higher than 10 0000 .' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'The description must be at least 3 characters long',
  })
  @MaxLength(1000, {
    message: 'The description cannot be longer than 10000 characters',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  // @IsUrl({}, { message: 'Image must be a valid URL.' })
  image: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'The rate must be a number.' })
  @Min(0, { message: 'The rate cannot be lower then 0.' })
  @Max(5, { message: 'The rate cannot be higher then 5.' })
  ratingRate: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'The number of ratings must be an integer.' })
  @Min(0, { message: 'The number of ratings cannot be negative.' })
  ratingCount: number;

  @IsString()
  @IsUUID('4', { message: 'categoryId must be correct id UUID v4.' })
  @IsNotEmpty()
  categoryId: string;

}

// model Product {
//   id          String   @id @default(uuid())
//   title       String   @unique
//   price       Float
//   description String
//   image       String
//   ratingRate  Float
//   ratingCount Int
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   categoryId  String
//   category    Category @relation(fields: [categoryId], references: [id])
// }
