-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "limit" REAL NOT NULL,
    "usedLimit" REAL NOT NULL DEFAULT 0,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "cards_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("dueDate", "id", "idUser", "limit", "name") SELECT "dueDate", "id", "idUser", "limit", "name" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
