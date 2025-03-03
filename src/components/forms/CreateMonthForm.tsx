'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const CreateMonthForm = ({ userId }: { userId: number }) => {
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');

  const handleSubmit = async () => {

    const expenseData = {
      userId: Number(userId),
      name,
      income: Number(income),
    }

    try {
      console.log("Criando mês...")
      const res = await fetch('/api/months', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
      });

      console.log("Status da resposta:", res.status);
      const data = await res.json()

      if (res.ok) {
        console.log("Mês criado com sucesso")
        setIncome('');
        setName('');
      } else {
        console.log(data.message)

      }
    } catch (err) {
      console.log("Erro ao criar user")
      console.log(err)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crie um novo Mês</CardTitle>
        <CardDescription>Preencha as informações abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="income">Income</Label>
            <Input id="income" type="email"
              value={income}
              onChange={(e) => { setIncome(e.target.value) }}
            />
          </div>
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Criar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
