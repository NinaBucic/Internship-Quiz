/*
  Warnings:

  - A unique constraint covering the columns `[userId,quizId]` on the table `UserQuizAnswers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserQuizAnswers_userId_quizId_key" ON "UserQuizAnswers"("userId", "quizId");
