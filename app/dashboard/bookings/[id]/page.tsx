'use client';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MapPin, Package, User, Edit, Trash2, ChevronsUpDown, Check } from 'lucide-react';
import { format } from 'date-fns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useParams, useRouter } from 'next/navigation';
import {
    deleteBooking,
    getBooking,
    getBookingStatusList,
    getLoggedUserProfile,
    getUserById,
    isAdmin,
    isCustomer,
    isOwner, updateStatus
} from '@/app/lib/service';
import { BookingResponse } from '@/app/lib/definitions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import StatusBadge from '@/app/ui/Dashboard/Owner/statusBadge';

export default function SingleBookingPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params.id as string;

    const [booking, setBooking] = useState<BookingResponse>();
    const [error, setError] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [statusList, setStatusList] = useState<string[]>([]);
    const [status, setStatus] = useState();
   


    async function getBookingDetails() {
        try {
            const response = await getBooking(bookingId);
            setBooking(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load booking');
        }
    }
    async function getStatusList() {
        try {
            const response = await getBookingStatusList();
            setStatusList(response || []);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load booking status list');
            setStatusList([]);
        }
    }



    useEffect(() => {
        getBookingDetails();
        if (isOwner()) {
            getStatusList();
        }
    }, []);


    const handleUpdate = () => {
        router.push(`/bookings/${bookingId}/edit`);
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteBooking(bookingId);
            router.push('/dashboard');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete booking');
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    const canModifyBooking = () => {
        if (!booking) return false;
        return booking.status === 'PENDING' && isCustomer();
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-2xl">
                    <CardContent className="pt-6">
                        <div className="text-center text-red-500">{error}</div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg text-gray-500">Loading...</div>
            </div>
        );
    }



    // Component for rendering user details
    const UserDetailsSection = ({ title, user }: { title: string; user: { name: string; email: string } }) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                {title}
            </h3>
            <div className="pl-7 space-y-2">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );

    const renderUserDetails = () => {
        if (isAdmin()) {
            return (
                <>
                    <UserDetailsSection title="Customer Details" user={booking.customer} />
                    <UserDetailsSection title="Owner Details" user={booking.machine.owner} />
                </>
            );
        } else if (isCustomer()) {
            return <UserDetailsSection title="Owner Details" user={booking.machine.owner} />;
        } else if (isOwner()) {
            return <UserDetailsSection title="Customer Details" user={booking.customer} />;
        }
        return null;
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl">Booking Details</CardTitle>
                            <p className="text-sm text-gray-500">Booking Code: {booking?.bookingCode}</p>
                        </div>
                        <StatusBadge booking={booking} statusList={statusList}/>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Machine Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Machine Information
                        </h3>
                        <div className="pl-7 space-y-2">
                            <Image
                                src={booking.machine.imageUrl}
                                alt={booking.machine.name}
                                width={800}
                                height={500}
                                className="w-full h-[300px] object-cover rounded-md"
                            />
                            <p className="text-lg font-medium">{booking.machine.name}</p>
                            <p className="text-gray-600">{booking.machine.specification}</p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Rental Period
                            </h3>
                            <div className="pl-7 space-y-2">
                                <p>Start: {format(new Date(booking.startDate), 'PPP')}</p>
                                <p>End: {format(new Date(booking.endDate), 'PPP')}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Pickup Location
                            </h3>
                            <div className="pl-7">
                                <p>{booking.pickUpLocation}</p>
                            </div>
                        </div>
                    </div>

                    {/* User Details - Updated Logic */}
                    {renderUserDetails()}

                    {/* Payment Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Payment Details
                        </h3>
                        <div className="pl-7">
                            <p className="text-xl font-semibold">
                                Total Amount: ${booking.totalAmount.toLocaleString()}
                            </p>
                        </div>
                    </div>


                </CardContent>

                {canModifyBooking() && (
                    <CardFooter className="flex justify-end space-x-4">
                        <Button
                            variant="outline"
                            onClick={handleUpdate}
                            className="flex items-center gap-2"
                        >
                            <Edit className="h-4 w-4" />
                            Update
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setShowDeleteDialog(true)}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </CardFooter>
                )}
            </Card>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the booking.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}