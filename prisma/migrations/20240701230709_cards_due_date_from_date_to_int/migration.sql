/*
  Warnings:

  - You are about to alter the column `dueDate` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "limit" REAL NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "cards_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("dueDate", "id", "idUser", "limit", "name") SELECT "dueDate", "id", "idUser", "limit", "name" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
CREATE UNIQUE INDEX "cards_idUser_key" ON "cards"("idUser");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
