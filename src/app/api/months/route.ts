// src/app/api/months/route.ts
import * as monthService from '@/app/services/monthService';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  
  try {
    const months = await monthService.getMonthsByUser(Number(userId));
    return NextResponse.json(months, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Erro ao obter meses' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, name, income } = await req.json();

  try {
    const updatedMonth = await monthService.updateMonth(id, name, income);
    return NextResponse.json(updatedMonth, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Erro ao atualizar m s' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('monthId'));

  try {
    await monthService.deleteMonth(id);
    return NextResponse.json(null, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Erro ao deletar m s' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { name, income, userId } = await req.json();

  try {
    const month = await monthService.createMonth(userId, name, income);
    return NextResponse.json(month, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Erro ao criar mes' }, { status: 500 });
  }
}
