import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsNotEmpty()
  @IsString()
  quizId: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}
