import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz created successfully.' })
  async create(@Body() dto: CreateQuizDto) {
    return await this.quizService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes or search by title' })
  @ApiResponse({ status: 200, description: 'List of quizzes.' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search quizzes by title',
  })
  async findAll(@Query('search') search?: string) {
    const trimmed = search?.trim();
    if (trimmed) {
      return this.quizService.searchByTitle(trimmed);
    }
    return this.quizService.findAll();
  }

  @UseGuards(AdminAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz found.' })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz updated successfully.' })
  async update(@Param('id') id: string, @Body() dto: UpdateQuizDto) {
    return await this.quizService.update(id, dto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz deleted successfully.' })
  async remove(@Param('id') id: string) {
    return await this.quizService.remove(id);
  }
}
