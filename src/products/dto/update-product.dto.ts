import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  category_id?: number;
}
