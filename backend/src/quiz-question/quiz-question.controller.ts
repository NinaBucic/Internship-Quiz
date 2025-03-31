import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quiz-question')
@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post()
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionService.create(createQuizQuestionDto);
  }

  @Get()
  findAll() {
    return this.quizQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizQuestionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizQuestionService.remove(+id);
  }
}
