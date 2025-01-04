
'use client';
import { admin } from "@/lib/utils";
import AllBookings from "@/components/customui/dashboard/admin/allbookings";
import { ProtectedRoute } from "@/app/protector";


export default function BookingsPage() {
    return (
        <ProtectedRoute allowedRoles={admin}>
            <AllBookings />
        </ProtectedRoute>
    );
}