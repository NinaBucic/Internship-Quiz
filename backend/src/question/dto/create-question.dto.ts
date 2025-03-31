import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Prisma, QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  options?: Prisma.JsonObject;

  @IsNotEmpty()
  correctAnswer: Prisma.JsonObject;
}
