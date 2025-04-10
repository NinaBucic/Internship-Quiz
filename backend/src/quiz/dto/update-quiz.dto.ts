import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuizDto {
  @ApiPropertyOptional({
    description: 'New title of the quiz',
    example: 'Updated Quiz Title',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    description: 'New category ID',
    example: 'History',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;
}
