export class GetProductResponseDto {
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
