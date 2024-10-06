'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";

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
    <Card>
      <CardContent>
        {despesas.map((despesa) => (
          <div key={despesa.id} className="flex items-center justify-between mb-2">
            <span>
              {despesa.description} - R$ {despesa.amount.toFixed(2)}
            </span>
            <Button onClick={() => handleDeleteDespesa(despesa.id)} variant="destructive">
              Deletar
            </Button>
          </div>
        ))}
        <p>Total das despesas: {despesas.reduce((total, despesa) => total + despesa.amount, 0)}</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value ? parseFloat(e.target.value) : '')}
            className="border p-2 mr-2"
          />
          <Button onClick={handleAddDespesa}>Adicionar Despesa</Button>
        </div>
      </CardContent>

    </Card>
  );
};

export default DespesasPage;
