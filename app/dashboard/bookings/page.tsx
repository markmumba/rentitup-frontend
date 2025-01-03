
'use client';
import { admin } from "@/lib/utils";
import AllBookings from "@/components/custom-ui/dashboard/admin/all-bookings";
import { ProtectedRoute } from "@/app/protector";


export default function BookingsPage() {
    return (
        <ProtectedRoute allowedRoles={admin}>
            <AllBookings />
        </ProtectedRoute>
    );
}