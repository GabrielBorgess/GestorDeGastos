import prisma from "../lib/prisma"

export const createMonth = async (userId: number, name: string, income: number) => {
    return await prisma.month.create({
        data: {
            userId,
            name,
            income
        }
    });
};

export const getMonthsByUser = async (userId: number) => {
    return prisma.month.findMany({
        where: {
            userId
        }
    })
};

export const updateMonth = async (id: number, name?: string, income?: number) => {
    return await prisma.month.update({
      where: { id },
      data: {
        name,
        income,
      },
    });
  };
  
  export const deleteMonth = async (id: number) => {
    return await prisma.month.delete({
      where: { id },
    });
  };