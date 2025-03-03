import React from 'react';
import { Month } from '@/types/expenses';
import { MonthCard } from './MonthCard';

interface MonthsGridProps {
  months: Month[];
  onDeleteMonth: (id: number) => Promise<boolean>;
}

export const MonthsGrid = ({ months, onDeleteMonth }: MonthsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map((month) => (
        <MonthCard 
          key={month.id} 
          month={month} 
          onDelete={onDeleteMonth} 
        />
      ))}
    </div>
  );
};