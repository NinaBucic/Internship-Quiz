import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateUserQuizAnswerDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  quizId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  points: number;
}
