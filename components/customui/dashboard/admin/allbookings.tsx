import React, { useState } from 'react';
import { Search, AlertCircle, X, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { bookingAPI } from '@/lib/service';
import { BookingListResponse } from '@/lib/definitions';



const BookingModal = ({ booking, isOpen, onClose }: {
    booking: BookingListResponse;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle>Booking #{booking.bookingCode}</DialogTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Booking Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Booking Code</label>
                                <p className="mt-0.5 font-mono text-sm">{booking.bookingCode}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Status</label>
                                <div className="mt-0.5">
                                    <StatusBadge status={booking.status} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Total Amount</label>
                                <p className="mt-0.5 text-sm font-medium">${booking.totalAmount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Start Date</label>
                                <p className="mt-0.5 text-sm">{new Date(booking.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">End Date</label>
                                <p className="mt-0.5 text-sm">{new Date(booking.endDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Duration</label>
                                <p className="mt-0.5 text-sm">
                                    {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    </Dialog>
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

export default function AllBookings() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState<BookingListResponse | null>(null);

    const { 
        data: allBookings, 
        isLoading, 
        isError, 
        error 
    } = useQuery<BookingListResponse[], Error>({
        queryKey: ['bookings'],
        queryFn: bookingAPI.getAllBookings,
    });

    const filteredBookings = allBookings?.filter(booking => {
        const matchesSearch = booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-4">
            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Bookings</CardTitle>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-48">
                                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search bookings..."
                                    className="pl-8 h-8 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-32 h-8">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-8 w-full" />
                            ))}
                        </div>
                    ) : filteredBookings ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booking Code</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Total Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBookings.map((booking) => (
                                        <TableRow
                                            key={booking.id}
                                            className="cursor-pointer hover:bg-muted/50"
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            <TableCell className="font-mono">{booking.bookingCode}</TableCell>
                                            <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={booking.status} />
                                            </TableCell>
                                            <TableCell className="text-right font-medium">Ksh {booking.totalAmount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : null}
                </CardContent>
            </Card>

            {selectedBooking && (
                <BookingModal
                    booking={selectedBooking}
                    isOpen={!!selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}

            {isError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}