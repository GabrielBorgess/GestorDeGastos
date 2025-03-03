import prisma from "@/app/lib/prisma";
import { MonthService } from './interface';

export const prismaMonthService: MonthService = {
  async createMonth(userId: number, name: string, income: number) {
    return await prisma.month.create({
      data: {
        userId,
        name,
        income
      }
    });
  },
  
  async getMonthsByUser(userId: number) {
    return prisma.month.findMany({
      where: {
        userId
      }
    });
  },
  
  async updateMonth(id: number, data: { name?: string, income?: number }) {
    return await prisma.month.update({
      where: { id },
      data
    });
  },
  
  async deleteMonth(id: number) {
    return await prisma.month.delete({
      where: { id }
    });
  }
};