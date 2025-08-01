export class CreateProductResponseDto {
      id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    ratingRate: number;
    ratingCount: number;
    createdAt: Date; 
    updatedAt: Date;
    categoryId: string;
    category? : {
      id: string;
      name: string;
    }
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

// model Category {
//   id        String    @id @default(uuid())
//   name      String    @unique
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   products  Product[]
// }
