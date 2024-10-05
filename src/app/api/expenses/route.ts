// src/app/api/expenses/route.ts
import * as expenseService from '@/app/services/expenseService';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const monthId = searchParams.get('monthId');
  
  try {
    const expenses = await expenseService.getExpensesByMonthId(Number(monthId));
    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao obter despesas' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, description, amount } = await req.json();

  try {
    const updatedExpense = await expenseService.updateExpense(id, description, amount);
    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao atualizar despesa' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await expenseService.deleteExpense(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao deletar despesa' }, { status: 500 });
  }
}

