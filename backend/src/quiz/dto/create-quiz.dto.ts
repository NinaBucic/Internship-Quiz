import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Name of the quiz',
    example: 'Cool Quiz',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Category ID to which the quiz belongs',
    example: 'History',
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: 'Array of question IDs to be linked to this quiz',
    example: ['uuid-question-1', 'uuid-question-2'],
    required: true,
  })
  @IsArray()
  @ArrayMinSize(5, { message: 'A quiz must contain at least 5 questions' })
  @IsString({ each: true })
  questionIds: string[];
}
