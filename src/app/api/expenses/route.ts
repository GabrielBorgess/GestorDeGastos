import * as expenseService from '@/services/expenseService';
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

export async function POST(req: Request) {
  const { description, amount, monthId } = await req.json();

  try {
    const expense = await expenseService.createExpense(description, amount, monthId);
    return new Response(JSON.stringify(expense), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erro ao criar despesa' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('expenseId');

  try {
    await expenseService.deleteExpense(Number(id));
    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao deletar despesa' }, { status: 500 });
  }
}

