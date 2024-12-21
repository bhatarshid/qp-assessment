/*
  Warnings:

  - You are about to drop the column `userId` on the `GroceryItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroceryItem" DROP CONSTRAINT "GroceryItem_userId_fkey";

-- AlterTable
ALTER TABLE "GroceryItem" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserGroceryItem" (
    "userId" INTEGER NOT NULL,
    "groceryItemId" INTEGER NOT NULL,

    CONSTRAINT "UserGroceryItem_pkey" PRIMARY KEY ("userId","groceryItemId")
);

-- AddForeignKey
ALTER TABLE "UserGroceryItem" ADD CONSTRAINT "UserGroceryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroceryItem" ADD CONSTRAINT "UserGroceryItem_groceryItemId_fkey" FOREIGN KEY ("groceryItemId") REFERENCES "GroceryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
