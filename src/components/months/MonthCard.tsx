// src/components/features/months/MonthCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Month } from '@/types/expenses';
import { DeleteMonthDialog } from './DeleteMonthDialog';

interface MonthCardProps {
  month: Month;
  onDelete: (id: number) => Promise<boolean>;
}

export const MonthCard = ({ month, onDelete }: MonthCardProps) => {
  const handleDelete = async () => {
    return await onDelete(month.id);
  };
    
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{month.name}</CardTitle>
        <DeleteMonthDialog 
          monthName={month.name} 
          onConfirmDelete={handleDelete} 
        />
      </CardHeader>
      <CardContent>
        <Link href={`/protected/expenses/${month.id}`}>
          <p className="text-muted-foreground mb-4 cursor-pointer">
            Clique aqui para ver mais informações
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-green-600">
            Receita: R${month.income}
          </span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};