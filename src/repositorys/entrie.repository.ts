import { prisma } from "../dbService";

export const createEntrie = async (data: any) => {
  const entrie = await prisma.entrie.create({ data });

	return entrie;
}