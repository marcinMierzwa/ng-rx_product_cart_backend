
class CategoryOutput {
  id: string;
  name: string;
}

export class GetProductOutputDto {
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
    category? : CategoryOutput
}