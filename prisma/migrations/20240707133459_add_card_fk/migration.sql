/*
  Warnings:

  - Added the required column `idCard` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bills" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ammount" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "idUser" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,
    CONSTRAINT "bills_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bills_idCard_fkey" FOREIGN KEY ("idCard") REFERENCES "cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bills" ("ammount", "dueDate", "id", "idUser", "title", "type") SELECT "ammount", "dueDate", "id", "idUser", "title", "type" FROM "bills";
DROP TABLE "bills";
ALTER TABLE "new_bills" RENAME TO "bills";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
