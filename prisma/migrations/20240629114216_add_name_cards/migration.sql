/*
  Warnings:

  - Added the required column `name` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "limit" REAL NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "cards_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("dueDate", "id", "idUser", "limit") SELECT "dueDate", "id", "idUser", "limit" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
CREATE UNIQUE INDEX "cards_idUser_key" ON "cards"("idUser");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
