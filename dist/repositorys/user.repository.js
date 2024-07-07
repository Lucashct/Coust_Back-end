"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUserByEmail = exports.createUser = void 0;
const dbService_1 = require("../dbService");
const createUser = async (data) => {
    const user = await dbService_1.prisma.user.create({ data });
    return user;
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    const user = await dbService_1.prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
};
exports.getUserByEmail = getUserByEmail;
const getUser = async (data) => {
    const user = await dbService_1.prisma.user.findUnique({
        where: {
            id: data.id
        },
        select: {
            id: true,
            email: true,
            name: true,
            cards: true
        }
    });
    return user;
};
exports.getUser = getUser;
