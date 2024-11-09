'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBooking, getLoggedUserProfile } from "../lib/service";
import { toast } from "@/hooks/use-toast";
import { BookingRequest } from "../lib/definitions";
import { BookingForm } from "../ui/Booking/bookingform";

export default function BookingPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const machineId = searchParams.get("machineId") ?? ""; 
    const [customerId, setCustomerId] = useState<string>(""); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        async function fetchUserProfile() {
            try {
                const response = await getLoggedUserProfile();
                setCustomerId(response.id);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load user profile');
                toast({
                    title: "Error",
                    description: "Failed to load user profile",
                    variant: "destructive",
                });
            }
        }

        fetchUserProfile();
    }, []);

    async function handleBookRequest(data: BookingRequest) {
        try {
            setIsLoading(true);
            const response = await createBooking(data);
            toast({
                title: "Booking successful",
                description: "Your machine has been booked successfully"
            });

            router.push("/dashboard");
        } catch (error) {
            toast({
                title: "Booking failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);         }
    }

    if (!customerId) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Book your machine</h1>
            </div>
            <BookingForm
                onSubmit={handleBookRequest}
                isLoading={isLoading}
                machineId={machineId}
                customerId={customerId}
            />
        </div>
    );
}