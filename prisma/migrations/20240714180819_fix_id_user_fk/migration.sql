/*
  Warnings:

  - You are about to drop the column `idUSer` on the `entries` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `entries` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_entries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "idBill" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "entries_idBill_fkey" FOREIGN KEY ("idBill") REFERENCES "bills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "entries_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_entries" ("dueDate", "id", "idBill", "value") SELECT "dueDate", "id", "idBill", "value" FROM "entries";
DROP TABLE "entries";
ALTER TABLE "new_entries" RENAME TO "entries";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
