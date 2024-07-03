/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ammount" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "bills_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dueDate" DATETIME NOT NULL,
    "limit" REAL NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "cards_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "entries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "idBill" TEXT NOT NULL,
    CONSTRAINT "entries_idBill_fkey" FOREIGN KEY ("idBill") REFERENCES "bills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bills_idUser_key" ON "bills"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "cards_idUser_key" ON "cards"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "entries_idBill_key" ON "entries"("idBill");
