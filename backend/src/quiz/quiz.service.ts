import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return await this.prisma.quiz.create({
      data: dto,
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
