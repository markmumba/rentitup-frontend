

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ExternalLink,Clock, Truck, } from 'lucide-react';
import { bookingAPI } from '@/lib/service';
import { BookingListResponse, MachineResponse, UserDetails } from '@/lib/definitions';

// Enhanced Bookings Table Component
const BookingsTable = ({ bookings, title }:{bookings:BookingListResponse[],title:string}) => (
    <Card>
        <CardHeader className="py-6">
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                        Showing bookings from latest to oldest
                    </CardDescription>
                </div>
                {bookings.length > 0 && (
                    <Badge variant="outline" className="ml-auto">
                        {bookings.length} bookings
                    </Badge>
                )}
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <ScrollArea className="w-full border-t">
                <div className="relative w-full">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10">
                            <TableRow className="hover:bg-transparent">
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
                                    <TableCell colSpan={6} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Clock className="h-8 w-8 mb-2" />
                                            <p>No bookings found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bookings.map((booking) => (
                                    <TableRow
                                        key={booking.bookingCode}
                                        className="group hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">{booking.bookingCode}</TableCell>
                                        <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="font-mono">
                                            KES {parseFloat(booking.totalAmount).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant={booking.status.toLowerCase() === 'pending' ? 'secondary' : 'success'}
                                                className="capitalize"
                                            >
                                                {booking.status.toLowerCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`dashboard/bookings/${booking.id}`}
                                                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:underline"
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

// Machines Table Component
const MachinesTable = ({ machines }:{machines:MachineResponse[]}) => (
    <Card>
        <CardHeader className="py-6">
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-semibold">Owned Machines</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                        Manage your machine inventory
                    </CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto">
                    {machines?.length || 0} machines
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <ScrollArea className="w-full border-t">
                <div className="relative w-full">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead className="w-[150px]">Base Price</TableHead>
                                <TableHead className="w-[150px]">Condition</TableHead>
                                <TableHead className="w-[150px]">Status</TableHead>
                                <TableHead className="w-[100px]">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!machines || machines.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Truck className="h-8 w-8 mb-2" />
                                            <p>No machines available</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                machines.map((machine) => (
                                    <TableRow key={machine.id} className="group hover:bg-muted/50">
                                        <TableCell className="font-medium">{machine.name}</TableCell>
                                        <TableCell className="font-mono">
                                            Ksh {parseFloat(machine.basePrice).toLocaleString()}
                                        </TableCell>
                                        <TableCell className="capitalize">{machine.condition.toLowerCase()}</TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant={machine.isAvailable ? "success" : "secondary"}
                                                className="capitalize"
                                            >
                                                {machine.isAvailable ? "Available" : "Unavailable"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/machines/${machine.id}`}
                                                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group-hover:underline"
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

export function Orders({ ownerId, userDetails }:{ownerId:string, userDetails:UserDetails}) {
    const { 
        data: bookingList = [], 
        isLoading, 
        isError, 
        error 
    } = useQuery({
        queryKey: ['ownerBookings', ownerId],
        queryFn: () => bookingAPI.getBookingsForOwner(ownerId),
        select: (data) => [...data].sort((a, b) => b.id - a.id),
    });

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

            {/* Booking Tables */}
            <div className="grid gap-6">
                <BookingsTable bookings={pendingBookings} title="Pending Booking Requests" />
                <BookingsTable bookings={confirmedBookings} title="Confirmed Bookings" />
                <MachinesTable machines={userDetails?.ownedMachines.filter((machine) => machine.verified)} />
            </div>
        </div>
    );
}

export default Orders;