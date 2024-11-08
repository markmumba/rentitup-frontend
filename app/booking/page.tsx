'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { BookingRequest } from "../lib/definitions";
import { createBooking } from "../lib/service";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { BookingForm } from "../ui/Booking/bookingform";


export default function () {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const machineId = searchParams.get("machineId")


    async function handleBookReqeust(data: BookingRequest) {
        try {
            const response = await createBooking(data);
            toast({
                title: "Login successful",
                description: "Welcome to your homepage"
            })

        } catch (error) {
            toast({
                title: "Registration failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <>
            <div className="container mx-auto py-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Book your machine</h1>
                </div>
                <BookingForm
                    onSubmit={handleBookReqeust}
                    isLoading={isLoading}
                />
            </div>

        </>
    )
}
