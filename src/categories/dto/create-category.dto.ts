import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  image?: string;
}
