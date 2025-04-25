import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const normalizedTitle =
      createCategoryDto.title.charAt(0).toUpperCase() +
      createCategoryDto.title.slice(1).toLowerCase();

    const existing = await this.prisma.category.findFirst({
      where: {
        title: {
          equals: normalizedTitle,
          mode: 'insensitive',
        },
      },
    });

    if (existing) {
      throw new ConflictException('Category already exists');
    }

    return this.prisma.category.create({
      data: {
        title: normalizedTitle,
        imageUrl: createCategoryDto.imageUrl,
      },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with that ID not found`);
    }
    return category;
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
