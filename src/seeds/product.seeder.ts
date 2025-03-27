import { getRepository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Category } from '../categories/category.entity';
import * as faker from 'faker';

export async function seedProducts() {
  const productRepository = getRepository(Product);
  const categoryRepository = getRepository(Category);

  const categories = await categoryRepository.find();

  if (categories.length === 0) {
    console.log('No categories found. Please seed categories first.');
    return;
  }

  for (let i = 0; i < 10; i++) {
    const product = new Product();
    product.name = faker.commerce.productName();
    product.description = faker.lorem.sentence();
    product.price = parseFloat(faker.commerce.price());
    product.image = faker.image.imageUrl();
    product.category =
      categories[Math.floor(Math.random() * categories.length)];

    await productRepository.save(product);
  }

  console.log('Products seeded successfully.');
}
