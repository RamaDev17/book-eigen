-- AlterTable
ALTER TABLE "Book_Borrowed" ALTER COLUMN "return_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "penalty" BOOLEAN NOT NULL DEFAULT false;
