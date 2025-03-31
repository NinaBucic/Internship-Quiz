import { Module } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { UserQuizAnswersController } from './user-quiz-answers.controller';

@Module({
  controllers: [UserQuizAnswersController],
  providers: [UserQuizAnswersService],
})
export class UserQuizAnswersModule {}
