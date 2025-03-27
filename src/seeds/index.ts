// src/seeds/index.ts
import { AppDataSource } from 'ormconfig';
import { seedCategories } from './category.seeder';
import { seedProducts } from './product.seeder';

async function seedDatabase() {
  await AppDataSource.initialize();
  console.log('Connected to database.');

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      'TRUNCATE TABLE "product" RESTART IDENTITY CASCADE',
    );
    await queryRunner.query(
      'TRUNCATE TABLE "category" RESTART IDENTITY CASCADE',
    );

    await seedCategories();
    await seedProducts();

    await queryRunner.commitTransaction();
    console.log('Database seeding completed.');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Seeding error:', error);
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seedDatabase().catch((error) => console.error('Seeding error:', error));
