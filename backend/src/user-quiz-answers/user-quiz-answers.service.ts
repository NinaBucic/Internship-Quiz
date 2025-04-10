import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserQuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateUserQuizAnswerDto) {
    const existing = await this.prisma.userQuizAnswers.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId: dto.quizId,
        },
      },
    });

    if (existing) {
      if (dto.points > existing.points) {
        const update = await this.prisma.userQuizAnswers.update({
          where: {
            userId_quizId: {
              userId,
              quizId: dto.quizId,
            },
          },
          data: {
            points: dto.points,
          },
        });

        const difference = dto.points - existing.points;

        await this.prisma.user.update({
          where: { id: userId },
          data: {
            totalPoints: {
              increment: difference,
            },
          },
        });

        return update;
      }

      return existing;
    }

    const created = await this.prisma.userQuizAnswers.create({
      data: {
        userId,
        quizId: dto.quizId,
        points: dto.points,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: {
          increment: dto.points,
        },
      },
    });

    return created;
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
            totalPoints: true,
          },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });
  }

  async getUserQuizRank(userId: string, quizId: string) {
    const userRecord = await this.prisma.userQuizAnswers.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
      select: {
        points: true,
      },
    });

    if (!userRecord) {
      throw new NotFoundException('You did not play this quiz yet.');
    }

    const higherScoreCount = await this.prisma.userQuizAnswers.count({
      where: {
        quizId,
        points: {
          gt: userRecord.points,
        },
      },
    });

    const totalPlayers = await this.prisma.userQuizAnswers.count({
      where: { quizId },
    });

    return {
      rank: higherScoreCount + 1,
      totalPlayers,
      message: `You are ranked #${higherScoreCount + 1} out of ${totalPlayers} players for this quiz`,
    };
  }
}
