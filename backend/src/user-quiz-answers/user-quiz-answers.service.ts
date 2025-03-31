import { Injectable } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UpdateUserQuizAnswerDto } from './dto/update-user-quiz-answer.dto';

@Injectable()
export class UserQuizAnswersService {
  create(createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    return 'This action adds a new userQuizAnswer';
  }

  findAll() {
    return `This action returns all userQuizAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userQuizAnswer`;
  }

  update(id: number, updateUserQuizAnswerDto: UpdateUserQuizAnswerDto) {
    return `This action updates a #${id} userQuizAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} userQuizAnswer`;
  }
}
