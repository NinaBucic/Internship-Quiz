import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    const { questionIds, ...quizData } = dto;

    const categoryExists = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!categoryExists) {
      throw new BadRequestException('Category not found');
    }

    const uniqueQuestionIds = [...new Set(questionIds)];

    if (uniqueQuestionIds.length < 5) {
      throw new BadRequestException(
        'A quiz must contain at least 5 unique questions',
      );
    }

    const validQuestions = await this.prisma.question.findMany({
      where: { id: { in: uniqueQuestionIds } },
    });

    if (validQuestions.length < uniqueQuestionIds.length) {
      throw new BadRequestException(
        'Some question IDs are invalid or missing from the database',
      );
    }

    const uniqueTypes = new Set(validQuestions.map((q) => q.type));
    if (uniqueTypes.size < 2) {
      throw new BadRequestException(
        'Quiz must contain questions of at least 2 different types',
      );
    }

    return await this.prisma.quiz.create({
      data: {
        ...quizData,
        quizQuestions: {
          create: uniqueQuestionIds.map((id) => ({
            question: { connect: { id } },
          })),
        },
      },
      include: {
        quizQuestions: {
          select: { question: true },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.quiz.findMany({
      select: {
        title: true,
        category: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      select: {
        title: true,
        category: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
        quizQuestions: {
          select: {
            question: {
              select: {
                title: true,
                type: true,
                options: true,
                correctAnswer: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) throw new NotFoundException(`Quiz not found`);

    return quiz;
  }

  async searchByTitle(title: string) {
    return await this.prisma.quiz.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      select: {
        title: true,
        category: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateQuizDto) {
    await this.findOne(id);

    if (dto.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!categoryExists) {
        throw new BadRequestException('Provided categoryId does not exist');
      }
    }

    return await this.prisma.quiz.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.quiz.delete({
      where: { id },
    });
  }
}
