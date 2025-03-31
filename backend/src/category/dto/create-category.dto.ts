import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
