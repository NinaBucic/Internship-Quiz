import { PrismaClient, Role, QuestionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: '1',
        username: 'admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin', 10),
        role: Role.Admin,
      },
      {
        id: '2',
        username: 'matematic',
        email: 'mate@gmail.com',
        password: await bcrypt.hash('mate', 10),
      },
      {
        id: '3',
        username: 'anaanic123',
        email: 'ana@gmail.com',
        password: await bcrypt.hash('ana', 10),
      },
      {
        id: '4',
        username: 'nicole',
        email: 'nicole@gmail.com',
        password: await bcrypt.hash('nicole', 10),
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        id: 'Geography',
        title: 'Geography',
        imageUrl:
          'https://www.shutterstock.com/image-vector/geography-education-concept-back-school-260nw-2401729627.jpg',
      },
      {
        id: 'Animals',
        title: 'Animals',
        imageUrl:
          'https://img.freepik.com/free-vector/set-labels-with-nice-animals_23-2147571947.jpg',
      },

      {
        id: 'Music',
        title: 'Music',
        imageUrl:
          'https://is3-ssl.mzstatic.com/image/thumb/Purple49/v4/f6/3c/0f/f63c0f05-a2d9-a211-0141-7585acaba6d9/source/512x512bb.jpg',
      },

      {
        id: 'History',
        title: 'History',
        imageUrl:
          'https://www.shutterstock.com/image-vector/education-poster-hand-drawn-style-260nw-1678940407.jpg',
      },
    ],
  });

  await prisma.quiz.createMany({
    data: [
      {
        id: '1',
        title: 'Geography Quiz',
        categoryId: 'Geography',
      },
      {
        id: '2',
        title: 'Animals Quiz',
        categoryId: 'Animals',
      },
      {
        id: '3',
        title: 'Music Quiz',
        categoryId: 'Music',
      },
      {
        id: '4',
        title: 'History Quiz',
        categoryId: 'History',
      },
    ],
  });

  await prisma.question.createMany({
    data: [
      {
        id: '1',
        title: 'Is lion a carnivore?',
        type: QuestionType.TrueFalse,
        categoryId: 'Animals',
        correctAnswer: true,
      },
      {
        id: '2',
        title: 'How many teeth does an adult rabbit have?',
        type: QuestionType.MultipleChoice,
        categoryId: 'Animals',
        options: ['28', '30', '26', '24'],
        correctAnswer: '28',
      },
      {
        id: '3',
        title: 'What type of animal is Shere Khan in "The Jungle Book"?',
        type: QuestionType.ShortAnswer,
        categoryId: 'Animals',
        correctAnswer: 'Tiger',
      },
      {
        id: '4',
        title: 'Does "Hippopotamus" means river horse?',
        type: QuestionType.TrueFalse,
        categoryId: 'Animals',
        correctAnswer: true,
      },
      {
        id: '5',
        title: 'What is the longest venomous snake?',
        type: QuestionType.MultipleChoice,
        categoryId: 'Animals',
        options: [
          'Green Anaconda',
          'Inland Taipan',
          'Yellow Bellied Sea Snake',
          'King Cobra',
        ],
        correctAnswer: 'King Cobra',
      },
      {
        id: '6',
        categoryId: 'Geography',
        title: 'Is Mount Everest the tallest mountain in the world?',
        type: QuestionType.TrueFalse,
        correctAnswer: true,
      },
      {
        id: '7',
        categoryId: 'Geography',
        title: 'What is the capital of France?',
        type: QuestionType.MultipleChoice,
        options: ['Paris', 'Lyon', 'Marseille', 'Nice'],
        correctAnswer: 'Paris',
      },
      {
        id: '8',
        categoryId: 'Geography',
        title: 'What is the second largest country in the world?',
        type: QuestionType.ShortAnswer,
        correctAnswer: 'Canada',
      },
      {
        id: '9',
        categoryId: 'Geography',
        title: 'The Bahamas lie off the coast of Florida?',
        type: QuestionType.TrueFalse,
        correctAnswer: true,
      },
      {
        id: '10',
        categoryId: 'Geography',
        title: 'Which country does Austria not border?',
        type: QuestionType.MultipleChoice,
        options: ['Slovenia', 'Switzerland', 'France', 'Slovakia'],
        correctAnswer: 'France',
      },
      {
        id: '11',
        categoryId: 'Music',
        title: 'Is Beethoven known for his symphonies?',
        type: QuestionType.TrueFalse,
        correctAnswer: true,
      },
      {
        id: '12',
        categoryId: 'Music',
        title: 'Which genre does Mozart primarily belong to?',
        type: QuestionType.MultipleChoice,
        options: ['Classical', 'Jazz', 'Rock', 'Pop'],
        correctAnswer: 'Classical',
      },
      {
        id: '13',
        categoryId: 'Music',
        title: 'Born Again is a tribute band for which world-famous pop group?',
        type: QuestionType.ShortAnswer,
        correctAnswer: 'ABBA',
      },
      {
        id: '14',
        categoryId: 'Music',
        title: 'Is rock music typically associated with electric guitars?',
        type: QuestionType.TrueFalse,
        correctAnswer: true,
      },
      {
        id: '15',
        categoryId: 'Music',
        title: 'Which band released the album "Abbey Road"?',
        type: QuestionType.MultipleChoice,
        options: ['The Beatles', 'The Rolling Stones', 'Queen', 'Pink Floyd'],
        correctAnswer: 'The Beatles',
      },
      {
        id: '16',
        categoryId: 'History',
        title: 'Did World War II end in 1945?',
        type: QuestionType.TrueFalse,
        correctAnswer: true,
      },
      {
        id: '17',
        categoryId: 'History',
        title: 'Who was the first President of the United States?',
        type: QuestionType.MultipleChoice,
        options: [
          'George Washington',
          'Abraham Lincoln',
          'Thomas Jefferson',
          'John Adams',
        ],
        correctAnswer: 'George Washington',
      },
      {
        id: '18',
        categoryId: 'History',
        title: 'How old was Adolf Hitler when he died?',
        type: QuestionType.ShortAnswer,
        correctAnswer: '56',
      },
      {
        id: '19',
        categoryId: 'History',
        title: 'Is the Roman Empire known for its extensive road network?',
        type: QuestionType.TrueFalse,
        correctAnswer: true,
      },
      {
        id: '20',
        categoryId: 'History',
        title:
          'Which war was fought between the North and South regions in the United States?',
        type: QuestionType.MultipleChoice,
        options: [
          'Civil War',
          'World War I',
          'Revolutionary War',
          'War of 1812',
        ],
        correctAnswer: 'Civil War',
      },
    ],
  });

  await prisma.quizQuestion.createMany({
    data: [
      { quizId: '2', questionId: '1' },
      { quizId: '2', questionId: '2' },
      { quizId: '2', questionId: '3' },
      { quizId: '2', questionId: '4' },
      { quizId: '2', questionId: '5' },

      { quizId: '1', questionId: '6' },
      { quizId: '1', questionId: '7' },
      { quizId: '1', questionId: '8' },
      { quizId: '1', questionId: '9' },
      { quizId: '1', questionId: '10' },

      { quizId: '3', questionId: '11' },
      { quizId: '3', questionId: '12' },
      { quizId: '3', questionId: '13' },
      { quizId: '3', questionId: '14' },
      { quizId: '3', questionId: '15' },

      { quizId: '4', questionId: '16' },
      { quizId: '4', questionId: '17' },
      { quizId: '4', questionId: '18' },
      { quizId: '4', questionId: '19' },
      { quizId: '4', questionId: '20' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
