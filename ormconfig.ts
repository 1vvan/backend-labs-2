import { Category } from 'src/categories/category.entity';
import { Product } from 'src/products/product.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'web_lab_sec',
  entities: [Category, Product],
  synchronize: false,
  name: 'default',
});
