import React from 'react'
import AuthForm from '@/components/forms/AuthForm'

const SignInPage = () => {

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold p-4'>Gestor de Gastos</h1>
      </div>
    <AuthForm />
    </div>
  )
}

export default SignInPage