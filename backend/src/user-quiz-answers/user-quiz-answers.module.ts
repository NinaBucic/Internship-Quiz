import { Module } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { UserQuizAnswersController } from './user-quiz-answers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserQuizAnswersController],
  providers: [UserQuizAnswersService, PrismaService],
})
export class UserQuizAnswersModule {}
