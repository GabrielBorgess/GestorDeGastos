'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
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
    <div className='m-6'>
      <p className='m-6 font-semibold text-xl'>Despesas:</p>
      <CardContent>
        {despesas.map((despesa) => (
          <div key={despesa.id} className="flex items-center justify-between mb-4">
            <div className='flex w-full justify-between'>
              <p>{despesa.description}</p>
              <p>R$ {despesa.amount.toFixed(2)}</p>
            </div>
            <Button onClick={() => handleDeleteDespesa(despesa.id)} variant='ghost'>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
        <div className='mt-6 mb-6 flex justify-center flex-col text-center'>
          <p className='font-semibold text-xl'>Total das despesas: </p>
          <p>Aproximadamente: R${Math.floor(despesas.reduce((total, despesa) => total + despesa.amount, 0))}</p>
        </div>
        <div className="mt-4 flex-wrap flex gap-4 justify-center">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="rounded-lg border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value ? parseFloat(e.target.value) : '')}
            className="rounded-lg border p-2 mr-2"
          />
        </div>
        <Button className='mt-4 flex w-full max-w-60 justify-center items-center text-center mx-auto' onClick={handleAddDespesa}>Adicionar Despesa</Button>
      </CardContent>

    </div>
  );
};

export default DespesasPage;
