'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const AuthForm = () => {
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
            })

            if (!signInResponse || signInResponse.ok !== true) {
                setEmail('');
                setPassword('');
                console.log(signInResponse)
                setMessage("Credenciais inválidas");
            } else {
                router.push('/')
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

    return (
        <>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Insira suas informações de acesso.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="button" className="w-full" onClick={handleSubmit}>
                            Sign In
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        {message}
                    </p>
                </CardFooter>
            </Card>

        </>
    )
};

export default AuthForm