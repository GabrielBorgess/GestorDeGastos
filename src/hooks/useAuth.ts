import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage('Entrando...');
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (!signInResponse || !signInResponse.ok) {
                setEmail('');
                setPassword('');
                setMessage("Credenciais inválidas");
            } else {
                router.push('/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/protected/dashboard');
        }
    }, [status, router, session]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        message,
        handleSubmit
    };
};