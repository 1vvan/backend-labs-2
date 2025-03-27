import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(query: PaginateQuery) {
    return paginate(query, this.categoryRepository, {
      sortableColumns: ['name', 'created_at'],
      searchableColumns: ['name', 'description'],
      defaultSortBy: [['created_at', 'DESC']],
      defaultLimit: 10,
    });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepository.save({ ...category, ...updateCategoryDto });
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepository.remove(category);
  }
}
