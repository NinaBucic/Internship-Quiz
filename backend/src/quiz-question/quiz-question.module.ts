import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService, PrismaService],
})
export class QuizQuestionModule {}
