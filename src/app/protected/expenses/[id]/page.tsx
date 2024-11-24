'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
 import { Button } from '@/components/ui/button';
 import { Trash2 } from 'lucide-react';

const DespesasPage = () => {
  const { id } = useParams();
  const [despesas, setDespesas] = useState<{ id: number; description: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | ''>('');

  //trazer despesas
  useEffect(() => {
    if (id) {
      const fetchDespesas = async () => {
        try {
          const response = await fetch(`/api/expenses?monthId=${id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar despesas');
          }
          const data = await response.json();
          setDespesas(data);
          console.log(data)
        } catch (error) {
          console.error(error);
          setError('Erro ao buscar despesas');
        } finally {
          setLoading(false);
        }
      };

      fetchDespesas();
    }
  }, [id]);

  //adicionar despesa
  const handleAddDespesa = async () => {
    if (!descricao || !valor) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monthId: Number(id), description: descricao, amount: parseFloat(String(valor)) }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar despesa');
      }

      const newDespesa = await response.json();
      setDespesas((prevDespesas) => [...prevDespesas, newDespesa]);

      setDescricao('');
      setValor('');
    } catch (error) {
      console.error(error);
      setError('Erro ao adicionar despesa');
    }
  };

  //deletar despesa
  const handleDeleteDespesa = async (despesaId: number) => {
    try {
      const response = await fetch(`/api/expenses/?expenseId=${despesaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar despesa');
      }

      console.log('Despesa deletada com sucesso');
      setDespesas((prevDespesas) => prevDespesas.filter((despesa) => despesa.id !== despesaId));
    } catch (error) {
      console.error(error);
      setError('Erro ao deletar despesa');
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
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
            {despesas.map((despesa) => (
              <tr key={despesa.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{despesa.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                   {despesa.amount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteDespesa(despesa.id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    <Trash2 className="h-6 w-6 text-red-500 sm:hidden" />
                    <span className="hidden sm:inline">Deletar</span>
                  </button>
                </td>
              </tr>
            ))}
            {despesas.length === 0 && (
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
        <Button className='mt-4 flex w-full max-w-60 justify-center items-center text-center mx-auto' onClick={handleAddDespesa}>Adicionar Despesa</Button>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold text-xl">Total das despesas</p>
        <p className="text-lg">
          R${despesas.reduce((total, despesa) => total + despesa.amount, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default DespesasPage;
