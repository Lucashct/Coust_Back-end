"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBill = void 0;
const dbService_1 = require("../dbService");
const createBill = async (data) => {
    const bill = await dbService_1.prisma.bill.create({ data });
    return bill;
};
exports.createBill = createBill;
