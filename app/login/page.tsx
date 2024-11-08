'use client';
import { useRouter } from "next/navigation";
import { LoginForm } from "../ui/login";
import { loginUser } from "../lib/service";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";




export default function Registration() {


    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(data: loginRequest) {
        try {
            setIsLoading(true)
            const response = loginUser(data);
            toast({
                title: "Login successful",
                description: "Welcome to your homepage"
            })

            router.push('/dashboard')

        } catch (error) {
            toast({
                title: "Registration failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally{
            setIsLoading(false)
        }

    }


        return (
            <>
                <div className="container mx-auto py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Log in to your account</h1>
                    </div>

                    <LoginForm
                        onSubmit={handleLogin}
                        isLoading={isLoading}
                    />
                </div>
            </>
        )

}