import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserQuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserQuizAnswersDto: CreateUserQuizAnswerDto) {
    return this.prisma.userQuizAnswers.create({
      data: createUserQuizAnswersDto,
    });
  }

  async findAllByQuiz(quizId: string) {
    return await this.prisma.userQuizAnswers.findMany({
      where: {
        quizId,
      },
      include: {
        quiz: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            username: true,
            email: true,
            totalPoints: true,
          },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });
  }
}
