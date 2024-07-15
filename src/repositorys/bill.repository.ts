import { prisma } from "../dbService";

export const createBill = async (data: any) => {
  const bill = await prisma.bill.create({ data });

  return bill;
}