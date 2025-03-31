import { Injectable } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';

@Injectable()
export class QuizQuestionService {
  create(createQuizQuestionDto: CreateQuizQuestionDto) {
    return 'This action adds a new quizQuestion';
  }

  findAll() {
    return `This action returns all quizQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizQuestion`;
  }
}
