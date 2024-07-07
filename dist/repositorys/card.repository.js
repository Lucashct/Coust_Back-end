"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCard = exports.listCards = exports.createCard = void 0;
const dbService_1 = require("../dbService");
const createCard = async (data) => {
    const card = await dbService_1.prisma.card.create({ data });
    return card;
};
exports.createCard = createCard;
const listCards = async (data) => {
    const cards = await dbService_1.prisma.card.findMany({
        where: {
            idUser: data.id
        }
    });
    return cards;
};
exports.listCards = listCards;
const removeCard = async (data) => {
    const card = await dbService_1.prisma.card.delete({
        where: {
            id: data.id
        }
    });
    return card;
};
exports.removeCard = removeCard;
