import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import { LoginRequest } from "../../lib/definitions"
import Link from "next/link"


const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must not exceed 50 characters"),
})




export function LoginForm(
    { onSubmit, isLoading }:
        { onSubmit: (data: LoginRequest) => void, isLoading?: boolean }) {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })



    function handleSubmit(values: z.infer<typeof loginSchema>) {
        console.log("This is the loginform page ", values)
        onSubmit(values);
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full md:max-w-2xl mx-auto p-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        {isLoading ? "Loading... " : "Login"}
                    </Button>

                </form>
            </Form>

            <div className="text-center text-muted-foreground underline relative">
                <div className="p-2">
                    <p>Forgot password</p>
                </div>
                <div className="p-2">
                    <Link href="/register" >Go back to register</Link>
                </div>
                
                <div className="p-2">
                    <Link href="/" >Go back home </Link>
                </div>
            </div>

        </>
    )

}