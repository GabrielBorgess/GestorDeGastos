'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Month {
    id: number;
    name: string;
    createdAt: Date;
    expenses: number;
    income: number;
  }

const MonthsContainer = () => {
  const [months, setMonths] = useState<Month[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch('/api/months?userId=1');
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
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map((month) => (
        <Card key={month.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{month.name} {new Date(month.createdAt).getFullYear()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Click to view details</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-red-600">Vai sair: ${month.expenses}</span>
              <span className="text-sm font-medium text-green-600">Entrou: ${month.income}</span>
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
