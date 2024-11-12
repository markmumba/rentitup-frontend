import { BookingListResponse } from "@/app/lib/definitions";
import { getBookingsByUser, getLoggedUserProfile } from "@/app/lib/service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { AlertCircle, Calendar, Package, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"


const StatsCard = ({ title, value, icon: Icon, description }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    description?: string;
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
        </CardContent>
    </Card>
);

const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
            {status}
        </Badge>
    );
};

// Clickable booking row component
const BookingRow = ({ booking }: { booking: BookingListResponse }) => (
    <TableRow 
        key={booking.id}
        className="group hover:bg-muted cursor-pointer transition-colors"
    >
        <TableCell className="font-medium">
            <Link 
                href={`dashboard/bookings/${booking.id}`}
                className="block w-full h-full"
            >
                {booking.bookingCode}
            </Link>
        </TableCell>
        <TableCell>
            <Link 
                href={`dashboard/bookings/${booking.id}`}
                className="block w-full h-full"
            >
                {format(new Date(booking.startDate), "MMM dd, yyyy")}
            </Link>
        </TableCell>
        <TableCell>
            <Link 
                href={`dashboard/bookings/${booking.id}`}
                className="block w-full h-full"
            >
                {format(new Date(booking.endDate), "MMM dd, yyyy")}
            </Link>
        </TableCell>
        <TableCell>
            <Link 
                href={`dashboard/bookings/${booking.id}`}
                className="block w-full h-full"
            >
                <StatusBadge status={booking.status} />
            </Link>
        </TableCell>
        <TableCell className="text-right">
            <Link 
                href={`dashboard/bookings/${booking.id}`}
                className="block w-full h-full"
            >
                KES {parseFloat(booking.totalAmount).toLocaleString()}
            </Link>
        </TableCell>
    </TableRow>
);

export function BookingList({ userId }: { userId: string }) {
    const [bookingList, setBookingList] = useState<BookingListResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>();

    async function getBookingList() {
        try {
            setIsLoading(true);
            const response = await getBookingsByUser(userId);
            setBookingList(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unable to get booking list');
            toast({
                title: "Error",
                description: "Failed to load bookings",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBookingList();
    }, [userId]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // Calculate stats
    const totalBookings = bookingList.length;
    const activeBookings = bookingList.filter(b => 
        b.status.toLowerCase() === 'confirmed').length;
    const totalSpent = bookingList.reduce((sum, booking) => 
        sum + parseFloat(booking.totalAmount), 0);

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Bookings"
                    value={totalBookings}
                    icon={Package}
                    description="All time bookings"
                />
                <StatsCard
                    title="Active Bookings"
                    value={activeBookings}
                    icon={Calendar}
                    description="Currently active bookings"
                />
                <StatsCard
                    title="Total Spent"
                    value={`KES ${totalSpent.toLocaleString()}`}
                    icon={User}
                    description="Total amount spent"
                />
            </div>

            {/* Bookings Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                        Overview of your recent machine bookings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {bookingList.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No bookings found
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking Code</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookingList.map((booking) => (
                                    <BookingRow key={booking.id} booking={booking} />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}