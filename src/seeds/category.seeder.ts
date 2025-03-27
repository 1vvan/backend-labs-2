import { getRepository } from 'typeorm';
import { Category } from '../categories/category.entity';

export async function seedCategories() {
  const categoryRepository = getRepository(Category);

  const categories = [
    {
      name: 'Electronics',
      description: 'Devices and gadgets',
      image: 'https://example.com/electronics.jpg',
    },
    {
      name: 'Clothing',
      description: 'Fashion and apparel',
      image: 'https://example.com/clothing.jpg',
    },
    {
      name: 'Books',
      description: 'Books and literature',
      image: 'https://example.com/books.jpg',
    },
  ];

  for (const category of categories) {
    const exists = await categoryRepository.findOne({
      where: { name: category.name },
    });
    if (!exists) {
      await categoryRepository.save(category);
    }
  }

  console.log('Categories seeded successfully.');
}
