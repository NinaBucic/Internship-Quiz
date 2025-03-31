import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quiz-question')
@Controller('quiz-question')
export class QuizQuestionController {}
