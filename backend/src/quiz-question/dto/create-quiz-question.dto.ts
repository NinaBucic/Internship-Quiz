import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizQuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  quizId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  questionId: string;
}
