"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntrie = void 0;
const dbService_1 = require("../dbService");
const createEntrie = async (data) => {
    const entrie = await dbService_1.prisma.entrie.create({ data });
    return entrie;
};
exports.createEntrie = createEntrie;
