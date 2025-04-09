import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'Question created successfully.' })
  async create(@Body() dto: CreateQuestionDto) {
    return await this.questionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'List of questions.' })
  async findAll() {
    return await this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({ status: 200, description: 'Question found.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a question by ID' })
  @ApiResponse({ status: 200, description: 'Question updated successfully.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return await this.questionService.update(id, dto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async remove(@Param('id') id: string) {
    return await this.questionService.remove(id);
  }
}
