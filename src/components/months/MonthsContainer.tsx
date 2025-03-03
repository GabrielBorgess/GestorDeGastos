'use client'
import React from 'react';
import { useMonths } from '@/hooks/useMonth';
import { MonthsGrid } from './MonthGrid';

interface MonthsContainerProps {
  userId: number;
}

const MonthsContainer = ({ userId }: MonthsContainerProps) => {
  const { months, loading, error, deleteMonth } = useMonths(userId);

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
        Erro: {error}
      </div>
    );
  }

  if (months.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        Nenhum mês encontrado. Adicione um novo mês para começar.
      </div>
    );
  }

  return <MonthsGrid months={months} onDeleteMonth={deleteMonth} />;
};

export default MonthsContainer;