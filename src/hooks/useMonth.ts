import { useState, useEffect } from 'react';
import { Month } from '@/types/expenses';
export const useMonths = (userId: number) => {
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

  const deleteMonth = async (id: number) => {
    try {
      const response = await fetch(`/api/months?monthId=${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) {
        throw new Error('Erro ao deletar o mês');
      }
      
      setMonths(months.filter(month => month.id !== id));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { months, loading, error, deleteMonth };
};