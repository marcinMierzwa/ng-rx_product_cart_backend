import { PrismaClient } from '@prisma/client';

// Poprawione importy: ścieżka względna do podfolderu `data`
import * as categoriesData from './data-seed/categories.json';
import * as productsData from './data-seed/products.json';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Logika seedowania pozostaje bez zmian. Jest już poprawna.
  
  // 1. Dodaj kategorie
  await prisma.category.createMany({
    data: categoriesData,
    skipDuplicates: true,
  });
  console.log(`Seeding categories finished.`);
  
  // 2. Stwórz mapę kategorii
  const allCategories = await prisma.category.findMany();
  const categoryNameToIdMap = new Map(
    allCategories.map((cat) => [cat.name, cat.id]),
  );
  console.log('Category name-to-id map created.');

  // 3. Dodaj produkty
  console.log('Start seeding products...');
  for (const p of productsData) {
    const categoryId = categoryNameToIdMap.get(p.category);
    if (categoryId) {
      await prisma.product.create({
        data: {
          title: p.title,
          price: p.price,
          description: p.description,
          image: p.image,
          ratingRate: p.rating.rate,
          ratingCount: p.rating.count,
          categoryId: categoryId,
        },
      });
    } else {
      console.warn(`Category "${p.category}" for product "${p.title}" not found. Skipping.`);
    }
  }
  console.log(`Seeding products finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });