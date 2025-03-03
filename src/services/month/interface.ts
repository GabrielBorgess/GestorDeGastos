import { Month } from '@/types/expenses';

export interface MonthService {
  createMonth(userId: number, name: string, income: number): Promise<Month>;
  getMonthsByUser(userId: number): Promise<Month[]>;
  updateMonth(id: number, data: { name?: string, income?: number }): Promise<Month>;
  deleteMonth(id: number): Promise<Month>;
}