import prisma from "../app/lib/prisma";

export const createExpense = async (description: string, amount: number, monthId: number) => {
    return await prisma.expense.create({
      data: {
        description,
        amount,
        monthId,
      },
    });
  };
  
  export const getExpensesByMonthId = async (monthId: number) => {
    return await prisma.expense.findMany({
      where: { monthId },
    });
  };
  
  export const updateExpense = async (id: number, description?: string, amount?: number) => {
    return await prisma.expense.update({
      where: { id },
      data: {
        description,
        amount,
      },
    });
  };
  
  export const deleteExpense = async (id: number) => {
    return await prisma.expense.delete({
      where: { id },
    });
  };