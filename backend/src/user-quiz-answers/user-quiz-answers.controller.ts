import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserQuizAnswersService } from './user-quiz-answers.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UpdateUserQuizAnswerDto } from './dto/update-user-quiz-answer.dto';

@Controller('user-quiz-answers')
export class UserQuizAnswersController {
  constructor(private readonly userQuizAnswersService: UserQuizAnswersService) {}

  @Post()
  create(@Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    return this.userQuizAnswersService.create(createUserQuizAnswerDto);
  }

  @Get()
  findAll() {
    return this.userQuizAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userQuizAnswersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQuizAnswerDto: UpdateUserQuizAnswerDto) {
    return this.userQuizAnswersService.update(+id, updateUserQuizAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQuizAnswersService.remove(+id);
  }
}
