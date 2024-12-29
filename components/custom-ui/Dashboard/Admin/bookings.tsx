import React, { useState } from 'react';
import { Search, AlertCircle, X, Plus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { bookingAPI } from '@/lib/service';

interface BookingListResponse {
    id: number;
    bookingCode: string;
    startDate: string;
    endDate: string;
    status: string;
    totalAmount: string;
}


const BookingModal = ({ booking, isOpen, onClose }: {
    booking: BookingListResponse;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle>Booking Details</DialogTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Booking Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Booking Code</label>
                                <p className="mt-1 font-mono">{booking.bookingCode}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    <StatusBadge status={booking.status} />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                                <p className="mt-1 font-medium">${booking.totalAmount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                                <p className="mt-1">{new Date(booking.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">End Date</label>
                                <p className="mt-1">{new Date(booking.endDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                                <p className="mt-1">
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
    const [selectedBooking, setSelectedBooking] = useState<BookingListResponse | null>(null);

    // Replace useState and useEffect with useQuery
    const { 
        data: allBookings, 
        isLoading, 
        isError, 
        error 
    } = useQuery<BookingListResponse[], Error>({
        queryKey: ['bookings'],
        queryFn: bookingAPI.getAllBookings,
    });

    const filteredBookings = allBookings?.filter(booking =>
        booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddCategory = () => {
        router.push("/categories/add");
    };

    return (
        <div className="space-y-6">
           
            
            <div className="flex justify-end">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by booking code..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : filteredBookings ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Booking Code</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Total Amount</TableHead>
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
                                        <TableCell className="font-medium">${booking.totalAmount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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