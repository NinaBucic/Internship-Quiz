import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Prisma, QuestionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Question text',
    example: 'What is...?',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Question type',
    enum: QuestionType,
  })
  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsOptional()
  options?: Prisma.JsonObject;

  @ApiProperty()
  @IsNotEmpty()
  correctAnswer: Prisma.JsonObject;
}
