/*
  Warnings:

  - A unique constraint covering the columns `[secondaryEmail]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profiles_secondaryEmail_key" ON "profiles"("secondaryEmail");
