import { BookingRequest } from "@/app/lib/definitions";
import { z } from "zod";


const bookingSchema = z.object({
    
})


export function BookingForm(
    { onSubmit, isLoading }:
        { onSubmit: (data: BookingRequest) => void, isLoading?: boolean }) {

    return (
        <>

        </>

    )

}