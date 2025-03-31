import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user-quiz-answers')
@Controller('user-quiz-answers')
export class UserQuizAnswersController {
  constructor(
    private readonly userQuizAnswersService: UserQuizAnswersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user quiz answer record' })
  @ApiResponse({ status: 201, description: 'Record created successfully.' })
  async create(@Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    return await this.userQuizAnswersService.create(createUserQuizAnswerDto);
  }

  @Get(':quizId')
  @ApiOperation({ summary: 'Retrieve all answer records for quiz' })
  @ApiResponse({ status: 200, description: 'List of records.' })
  async findAllByQuiz(@Param('quizId') quizId: string) {
    return await this.userQuizAnswersService.findAllByQuiz(quizId);
  }
}
