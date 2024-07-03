import { prisma } from "../dbService";

export const createCard = async (data: any) => {
  const card = await prisma.card.create({ data });

  return card;
}

export const listCards = async (data: any) => {
  const cards = await prisma.card.findMany({
    where:{
      idUser: data.id
    }
  });

  return cards;
}