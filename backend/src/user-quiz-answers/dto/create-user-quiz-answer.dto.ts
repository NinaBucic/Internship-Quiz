import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateUserQuizAnswerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  quizId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  points: number;
}
