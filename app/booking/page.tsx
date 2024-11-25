'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBooking, getBookingsByMachine, getLoggedUserProfile } from "../lib/service";
import { toast } from "@/hooks/use-toast";
import { BookingListResponse, BookingRequest } from "../lib/definitions";
import { BookingForm } from "../ui/Booking/bookingform";
import { ProtectedRoute } from "../protector";
import { customer } from "../lib/utils";
import CalendarView from "../ui/Booking/calendarview";

export default function ProtectedBookingPage() {

    return (
        <ProtectedRoute allowedRoles={customer}>
            <BookingPage />
        </ProtectedRoute>
    )

}

function BookingPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const machineId = searchParams.get("machineId") ?? "";
    const basePrice = searchParams.get("basePrice") ?? "";
    const rate = searchParams.get("rate") ?? "";


    const [customerId, setCustomerId] = useState<string>("");
    const [existingBookings, setExistingBookings] = useState<BookingListResponse[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    async function handleBookRequest(data: BookingRequest) {
        try {
            setIsLoading(true);
            console.log("this is the booking/page.tsx", data);
            const response = await createBooking(data);
            toast({
                title: "Booking successful",
                description: "Your machine has been booked successfully",
            });
            router.push("/dashboard");
        } catch (error) {
            toast({
                title: "Booking failed",
                description:  "The dates you are picking are already picked ",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        async function fetchUserProfile() {
            try {
                const response = await getLoggedUserProfile();
                setCustomerId(String(response.id));
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load user profile');
                toast({
                    title: "Error",
                    description: "Failed to load user profile",
                    variant: "destructive",
                });
            }
        }
        async function handleGetBookingsForMachine() {
            try {
                const response = await getBookingsByMachine(machineId);
                setExistingBookings(response);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to get Bookings');
                toast({
                    title: "Error getting bookings",
                    description: "Failed to get bookings for machine ",
                    variant: "destructive"
                });
            }
        }

        fetchUserProfile();
        handleGetBookingsForMachine();
    }, []);

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
    if (!existingBookings) return "No bookings available";

    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Book your machine</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <CalendarView existingBookings={existingBookings} />
                </div>
                <div>
                    <BookingForm
                        onSubmit={handleBookRequest}
                        isLoading={isLoading}
                        machineId={machineId}
                        customerId={customerId}
                        priceCalculationType={rate}
                        basePrice={basePrice}
                    />
                </div>
            </div>
            
        </div>
    );
}