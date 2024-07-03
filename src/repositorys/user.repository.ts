import { prisma } from "../dbService";

export const createUser = async (data: any) => {
  const user = await prisma.user.create({ data });

  return user;
}

export const getUserByEmail = async(email: string | undefined) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  return user;
}

export const getUser = async(data: any) => {
  const user = await prisma.user.findUnique({
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
}