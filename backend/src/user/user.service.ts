import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        totalPoints: true,
      },
      orderBy: [{ role: 'desc' }, { totalPoints: 'desc' }],
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        totalPoints: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async getRank(userId: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { totalPoints: true },
    });

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    const betterRankCount = await this.prisma.user.count({
      where: {
        totalPoints: {
          gt: currentUser.totalPoints,
        },
      },
    });

    const totalUsers = await this.prisma.user.count();

    return {
      rank: betterRankCount + 1,
      totalUsers,
      message: `You are currently ranked #${betterRankCount + 1} out of ${totalUsers} users`,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      const data: Partial<UpdateUserDto> = { ...updateUserDto };
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
