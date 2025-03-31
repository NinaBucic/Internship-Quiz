import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category',
    example: 'History',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  })
  title: string;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://your-default-image-url.com/default.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
