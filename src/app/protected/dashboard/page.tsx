import { PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import MonthsContainer from '@/app/components/MonthsContainer'
import Link from 'next/link'

export default async function HomePage() {

    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Eai, {session?.user?.name}</h1>
                <Link href="/auth/signOut" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                    Log Out
                </Link>
                <Link href={'/protected/createExpense'}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Adicionar Mês
                    </Button>
                </Link>
            </header>
            <MonthsContainer userId={userId}
            />
        </div>
    )
}