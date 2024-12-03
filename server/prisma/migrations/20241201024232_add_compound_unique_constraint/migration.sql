-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_reportId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropIndex
DROP INDEX "likes_userId_commentId_key";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
