import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, CircleDollarSign, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { BookingListResponse, UserDetails } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';
import { bookingAPI } from '@/lib/service';

// Components
const BookingsTable = ({ bookings, title }: { bookings: BookingListResponse[], title: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
                Showing bookings from latest to oldest
            </CardDescription>
        </CardHeader>
        <CardContent className="relative">
            <ScrollArea className="w-full border rounded-md">
                <div className="relative w-full">
                    <Table>
                        <TableHeader className="bg-background sticky top-0 z-10">
                            <TableRow>
                                <TableHead className="w-[200px]">Booking Code</TableHead>
                                <TableHead className="w-[200px]">Start Date</TableHead>
                                <TableHead className="w-[200px]">End Date</TableHead>
                                <TableHead className="w-[150px]">Amount</TableHead>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-[100px]">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No bookings found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bookings.map((booking) => (
                                    <TableRow
                                        key={booking.bookingCode}
                                        className="group"
                                    >
                                        <TableCell className="font-medium">{booking.bookingCode}</TableCell>
                                        <TableCell>{booking.startDate}</TableCell>
                                        <TableCell>{booking.endDate}</TableCell>
                                        <TableCell>KES {booking.totalAmount}</TableCell>
                                        <TableCell>
                                            <Badge variant={booking.status.toLocaleLowerCase() === 'pending' ? 'secondary' : 'success'}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`dashboard/bookings/${booking.id}`}
                                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:underline"
                                            >
                                                View
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CardContent>
    </Card>
);

export function Orders({ ownerId, userDetails }: {
    ownerId: string;
    userDetails: UserDetails;
}) {
    // Fetch owner's bookings using TanStack Query
    const { 
        data: bookingList = [], 
        isLoading, 
        isError, 
        error 
    } = useQuery({
        queryKey: ['ownerBookings', ownerId],
        queryFn: () => bookingAPI.getBookingsForOwner(ownerId),
        select: (data) => [...data].sort((a, b) => b.id - a.id), // Sort by ID descending
    });

    // Derived states
    const pendingBookings = bookingList.filter(booking => 
        booking.status.toLowerCase() === 'pending'
    );
    
    const confirmedBookings = bookingList.filter(booking => 
        booking.status.toLowerCase() === 'confirmed'
    );

    const availableMachines = userDetails?.ownedMachines?.filter(
        machine => machine.isAvailable
    ).length || 0;

    const totalRevenue = bookingList
        .filter(booking => booking.status === 'COMPLETED')
        .reduce((sum, booking) => sum + parseFloat(booking.totalAmount), 0);

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    {error instanceof Error ? error.message : 'Unable to get booking list'}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available Machines</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl text-green-500 font-bold">{availableMachines}</div>
                        <p className="text-xs text-muted-foreground">
                            out of {userDetails?.ownedMachines?.length || 0} total machines
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl text-green-500 font-bold">
                            KES {totalRevenue.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Combined base price of all machines
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl text-green-500 font-bold">{bookingList.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Total bookings in the system
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Tables */}
            <BookingsTable bookings={pendingBookings} title="Pending Booking Requests" />
            <BookingsTable bookings={confirmedBookings} title="Confirmed Bookings" />

            {/* Machines Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Owned Machines</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <ScrollArea className="w-full border rounded-md">
                        <div className="relative w-full">
                            <Table>
                                <TableHeader className="bg-background sticky top-0 z-10">
                                    <TableRow>
                                        <TableHead className="w-[200px]">Name</TableHead>
                                        <TableHead className="w-[150px]">Base Price</TableHead>
                                        <TableHead className="w-[150px]">Condition</TableHead>
                                        <TableHead className="w-[150px]">Status</TableHead>
                                        <TableHead className="w-[100px]">Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userDetails?.ownedMachines?.map((machine) => (
                                        <TableRow key={machine.name} className="group">
                                            <TableCell className="font-medium">{machine.name}</TableCell>
                                            <TableCell>${machine.basePrice}</TableCell>
                                            <TableCell>{machine.condition}</TableCell>
                                            <TableCell>
                                                <Badge variant={machine.isAvailable ? "success" : "secondary"}>
                                                    {machine.isAvailable ? "Available" : "Unavailable"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/machines/${machine.id}`}
                                                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:underline"
                                                >
                                                    View
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

export default Orders;