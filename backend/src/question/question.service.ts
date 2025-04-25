import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuestionDto) {
    return await this.prisma.question.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.question.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        category: {
          select: {
            title: true,
          },
        },
        options: true,
        correctAnswer: true,
      },
      orderBy: {
        category: {
          title: 'asc',
        },
      },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        type: true,
        category: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
        options: true,
        correctAnswer: true,
      },
    });

    if (!question) throw new NotFoundException('Question not found');

    return question;
  }

  async update(id: string, dto: UpdateQuestionDto) {
    await this.findOne(id);
    return await this.prisma.question.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.question.delete({ where: { id } });
  }
}
