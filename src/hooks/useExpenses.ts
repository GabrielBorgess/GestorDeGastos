import { Exepnse } from "@/types/expenses"
import { useEffect, useState, useCallback } from "react"

export const useExpenses = (monthId: string | number | string[]) => {

    const [expenses, setExpenses] = useState<Exepnse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchExpense = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/expenses?monthId=${monthId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar despesas');
            }

            const data = await response.json();
            setExpenses(data);

        } catch (error) {
            console.error(error);
            setError('Erro ao buscar despesas');
        } finally {
            setLoading(false);
        };
    }, [monthId]);

    const addExpense = async (descricao: string, valor: number) => {
        if (!descricao || !valor) {
            throw new Error('Preencha todos os campos');
        }

        try {
            const response = await fetch('/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    monthId: Number(monthId),
                    description: descricao,
                    amount: parseFloat(String(valor))
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar despesa');
            };

            const newExpense = await response.json();
            setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
            return newExpense;

        } catch (error) {
            console.log(error);
            setError('Erro ao adicionar despesa');
            throw error;
        }

    };

    const deleteExpense = async (despesaId: number) => {
        try {
            const response = await fetch(`/api/expenses/?expenseId=${despesaId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar despesa');
            };

            setExpenses((prevExpenses) =>
                prevExpenses.filter((despesa) => despesa.id !== despesaId)
            );

            return true;
        } catch (error) {
            console.error(error);
            setError('Erro ao deletar despesa');
            throw error;
        }
    }

    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    useEffect(() => {
        if (monthId) {
            console.log("Buscando despesas")
            fetchExpense();
        };
    }, [monthId, fetchExpense]);

    return {
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
        totalExpenses
    }
}
