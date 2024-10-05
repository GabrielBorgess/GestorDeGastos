import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CreateMonthForm } from '@/app/components/CreateMonthForm'
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import React from 'react'


const page = async () => {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);



  return (
    <>    
      <Link href={'/protected/dashboard'} className='absolute p-6 font-bold'>Voltar</Link>
      <div className='flex flex-col justify-center items-center h-screen'>
        <CreateMonthForm userId={userId}/>
      </div>
    </>
  )
}

export default page