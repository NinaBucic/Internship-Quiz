import { Module } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { UserQuizAnswersController } from './user-quiz-answers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserQuizAnswersController],
  providers: [UserQuizAnswersService, PrismaService],
})
export class UserQuizAnswersModule {}
