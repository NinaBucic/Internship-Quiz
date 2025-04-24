import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';

@ApiTags('user-quiz-answers')
@Controller('user-quiz-answers')
export class UserQuizAnswersController {
  constructor(
    private readonly userQuizAnswersService: UserQuizAnswersService,
  ) {}

  @UseGuards(UserAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Save quiz results for logged-in user (only best score counts)',
  })
  @ApiResponse({
    status: 201,
    description: 'Quiz result saved and points updated',
  })
  async create(
    @Req() { user },
    @Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto,
  ) {
    return await this.userQuizAnswersService.create(
      user.sub,
      createUserQuizAnswerDto,
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('rank/:quizId')
  @ApiOperation({ summary: 'Get logged-in user rank for a specific quiz' })
  async getQuizRank(@Req() { user }, @Param('quizId') quizId: string) {
    return this.userQuizAnswersService.getUserQuizRank(user.sub, quizId);
  }

  @UseGuards(AdminAuthGuard)
  @Get(':quizId')
  @ApiOperation({ summary: 'Retrieve all answer records for quiz' })
  @ApiResponse({ status: 200, description: 'List of records.' })
  async findAllByQuiz(@Param('quizId') quizId: string) {
    return await this.userQuizAnswersService.findAllByQuiz(quizId);
  }
}
