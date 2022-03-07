/*
  Warnings:

  - You are about to drop the `_HobbyToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Hobby` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_HobbyToUser_B_index";

-- DropIndex
DROP INDEX "_HobbyToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_HobbyToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usersHobbys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "hobbyId" INTEGER NOT NULL,
    CONSTRAINT "usersHobbys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "usersHobbys_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Hobby" ("active", "description", "id", "image", "name") SELECT "active", "description", "id", "image", "name" FROM "Hobby";
DROP TABLE "Hobby";
ALTER TABLE "new_Hobby" RENAME TO "Hobby";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
