'use client'
import { useRouter, useSearchParams } from "next/navigation";
import {  BookingRequest } from "../../../lib/definitions";
import { toast } from "@/hooks/use-toast";
import { BookingForm } from "@/components/custom-ui/Booking/bookingform";
import { ProtectedRoute } from "../../protector";
import CalendarView from "@/components/custom-ui/Booking/calendarview";
import { customer, owner } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAPI, bookingAPI } from "@/lib/service"; // Assuming this is where your API functions are exported

export default function ProtectedBookingPage() {
    return (
        <ProtectedRoute allowedRoles={[...customer,...owner]}>
            <BookingPage />
        </ProtectedRoute>
    );
}

function BookingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const machineId = searchParams.get("machineId") ?? "";
    const basePrice = searchParams.get("basePrice") ?? "";
    const rate = searchParams.get("rate") ?? "";

    const { 
        data: userProfile,
        error: userError,
        isLoading: isLoadingProfile 
    } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userAPI.getLoggedUserProfile,
    });

    const {
        data: existingBookings,
        error: bookingsError,
        isLoading: isLoadingBookings
    } = useQuery({
        queryKey: ['machineBookings', machineId],
        queryFn: () => bookingAPI.getBookingsByMachine(machineId),
        enabled: !!machineId, 
    });

    const { 
        mutate: createNewBooking,
        isPending: isCreatingBooking 
    } = useMutation({
        mutationFn: (data: BookingRequest) => bookingAPI.createBooking(data),
        onSuccess: () => {
            toast({
                title: "Booking successful",
                description: "Your machine has been booked successfully",
            });
            
            queryClient.invalidateQueries({ queryKey: ['machineBookings'] });
            queryClient.invalidateQueries({ queryKey: ['userBookings'] });
            
            router.push("/dashboard");
        },
        onError: (error) => {
            toast({
                title: "Booking failed",
                description: error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        },
    });

    const handleBookRequest = (data: BookingRequest) => {
        console.log(data);
        createNewBooking(data);
    };

    if (isLoadingProfile || !userProfile || isLoadingBookings) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p>Loading...</p>
            </div>
        );
    }

    const error = userError || bookingsError;
    if (error) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p className="text-red-500">
                    {error instanceof Error ? error.message : 'An error occurred'}
                </p>
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
                        isLoading={isCreatingBooking}
                        machineId={machineId}
                        customerId={String(userProfile.id)}
                        priceCalculationType={rate}
                        basePrice={basePrice}
                    />
                </div>
            </div>
        </div>
    );
}