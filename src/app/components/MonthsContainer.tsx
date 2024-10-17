'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Month {
  id: number;
  name: string;
  createdAt: Date;
  expenses: number;
  income: number;
}

const MonthsContainer = ({ userId }: { userId: number }) => {
  const [months, setMonths] = useState<Month[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch(`/api/months?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os meses');
        }
        const data = await response.json();
        setMonths(data);
      } catch (error) {
        console.error(error);
        setError('desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchMonths();
  }, [userId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  const handleDeleteMonth = async (id: number) => {
    try {
      const response = await fetch(`/api/months/?monthId=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Erro ao deletar o mês');
      }

      setMonths(months.filter((month) => month.id !== id));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map((month) => (
        <Card key={month.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{month.name}</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Delete month</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the {month.name} data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteMonth(month.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
          <CardContent>
            <Link href={`/protected/expenses/${month.id}`}>
              <p className="text-muted-foreground mb-4 cursor-pointer">Clique aqui para ver mais informações</p>
            </Link>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-600">Receita: R${month.income}</span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(month.income / (month.income + month.expenses)) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MonthsContainer;
