"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { authAPI } from "@/lib/service"


const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
});

export default function ForgotPasswordPage() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate: sendResetLink, isPending } = useMutation({
        mutationFn: (email: string) => authAPI.forgotPassword(email),
        onSuccess: (response) => {
            toast({
                title: "Reset Link Sent",
                description: response,
                variant: "default"
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to send reset link. Please try again.",
                variant: "destructive"
            });
        }
    });

    function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        sendResetLink(values.email);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                {...field}
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                        We&apos;ll send a password reset link to this email
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}