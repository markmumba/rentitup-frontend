'use client';
import { useEffect, useState } from "react";
import { getBookingsForOwner, getLoggedUserProfile } from "../../lib/service";
import { toast } from "@/hooks/use-toast";
import { BookingListResponse } from "../../lib/definitions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Orders() {
    const router = useRouter();
    const [ownerId, setOwnerId] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>();
    const [bookings, setBookings] = useState<BookingListResponse[]>();

    const STATUSES = ["PENDING", "CONFIRMED", "ONGOING", "COMPLETED", "CANCELLED"];

    async function getBookingsList() {
        try {
            const response = await getBookingsForOwner(ownerId!);
            const sortedBookings = [...(response || [])].sort((a, b) => b.id - a.id);
            setBookings(sortedBookings);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load bookings');
        }
    }

    useEffect(() => {
        async function fetchUserId() {
            try {
                setIsLoading(true);
                const response = await getLoggedUserProfile();
                setOwnerId(String(response.id));
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load user profile');
                toast({
                    title: "Error",
                    description: "Failed to load user profile",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserId();
    }, []);

    useEffect(() => {
        if (ownerId) {
            getBookingsList();
        }
    }, [ownerId]);

    const handleBookingClick = (booking: BookingListResponse) => {
        router.push(`dashboard/bookings/${booking.id}`)
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        const colors = {
            PENDING: "bg-yellow-100 text-yellow-800",
            CONFIRMED: "bg-blue-100 text-blue-800",
            ONGOING: "bg-purple-100 text-purple-800",
            COMPLETED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
        };
        return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const groupedBookings = STATUSES.reduce((acc, status) => {
        acc[status] = bookings?.filter(booking => booking.status === status) || [];
        return acc;
    }, {} as Record<string, BookingListResponse[]>);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">All Orders</h1>
            <h2 className="text-xl font-semibold mb-4">Grouped by status</h2>

            <div className="space-y-6">
                {STATUSES.map(status => {
                    const statusBookings = groupedBookings[status];
                    if (!statusBookings?.length) return null;

                    return (
                        <Card key={status}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
                                        {status}
                                    </span>
                                    <span>({statusBookings.length})</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Booking Code</TableHead>
                                            <TableHead>Start Date</TableHead>
                                            <TableHead>End Date</TableHead>
                                            <TableHead>Total Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {statusBookings.map((booking) => (
                                            <TableRow
                                                key={booking.id}
                                                className="cursor-pointer hover:bg-gray-50"
                                                onClick={() => handleBookingClick(booking)}
                                            >
                                                <TableCell className="font-medium">{booking.bookingCode}</TableCell>
                                                <TableCell>{formatDate(booking.startDate)}</TableCell>
                                                <TableCell>{formatDate(booking.endDate)}</TableCell>
                                                <TableCell>{booking.totalAmount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}