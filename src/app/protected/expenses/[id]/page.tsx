'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';


const DespesasPage = () => {
  const { id } = useParams();
  const { 
    expenses, 
    loading, 
    error, 
    addExpense, 
    deleteExpense, 
    totalExpenses 
  } = useExpenses(id);
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | ''>('');

  const handleAddDespesa = async () => {
    if (!descricao || !valor) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      await addExpense(descricao, Number(valor));
      setDescricao('');
      setValor('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async (despesaId: number) => {
    try {
      await deleteExpense(despesaId);
    } catch (error) {
      // O erro já foi tratado no hook
      console.error(error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="container mx-auto p-16">
      <h2 className="text-2xl font-semibold mb-6">Despesas</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Descrição</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Valor (R$)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {expense.amount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    <Trash2 className="h-6 w-6 text-red-500 sm:hidden" />
                    <span className="hidden sm:inline">Deletar</span>
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center border border-gray-300 px-4 py-6 text-gray-500"
                >
                  Nenhuma despesa registrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="rounded-lg border p-2 w-full max-w-md"
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value ? parseFloat(e.target.value) : '')}
          className="rounded-lg border p-2 w-full max-w-md"
        />
        <Button 
          className='mt-4 flex w-full max-w-60 justify-center items-center text-center mx-auto' 
          onClick={handleAddDespesa}
        >
          Adicionar Despesa
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold text-xl">Total das despesas</p>
        <p className="text-lg">
          R${totalExpenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default DespesasPage;