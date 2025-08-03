import React, { useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isOwner } from '@/lib/service';
import { BookingResponse } from '@/lib/definitions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingAPI } from '@/lib/service'; // Assuming this is where your API functions are exported
import { toast } from '@/hooks/use-toast';

const STATUS_ORDER: Record<string, number> = {
    "PENDING": 0,
    "CONFIRMED": 1,
    "ONGOING": 2,
    "COMPLETED": 3,
    "CANCELLED": 4
};



const StatusBadge = ({ booking, statusList }: { booking: BookingResponse, statusList: string[] }) => {
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();

    const { mutate: updateBookingStatus, isPending: isUpdating } = useMutation({
        mutationFn: ({ bookingId, newStatus }: { bookingId: string, newStatus: string }) => 
            bookingAPI.updateStatus(bookingId, newStatus),
        onMutate: async ({ bookingId, newStatus }) => {
            await queryClient.cancelQueries({ queryKey: ['booking', bookingId] });

            const previousBooking = queryClient.getQueryData(['booking', bookingId]);

            queryClient.setQueryData(['booking', bookingId], (old: any) => ({
                ...old,
                status: newStatus
            }));

            return { previousBooking };
        },
        onError: (error, variables, context) => {
            if (context?.previousBooking) {
                queryClient.setQueryData(
                    ['booking', variables.bookingId],
                    context.previousBooking
                );
            }
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : 'Failed to update status',
                variant: "destructive",
            });
        },
        onSuccess: () => {
            setOpen(false);
            toast({
                title: "Success",
                description: "Booking status updated successfully",
            });
            window.location.reload();
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries({ queryKey: ['booking', variables.bookingId] });
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });

    const availableStatuses = useMemo(() => {
        if (!booking || !statusList) return [];

        const currentStatusIndex = STATUS_ORDER[booking.status];
        return statusList.filter(status => {
            const statusIndex = STATUS_ORDER[status];
            return status === "CANCELLED" || statusIndex > currentStatusIndex;
        });
    }, [booking, statusList]);

    const handleStatusUpdate = async (newStatus: string) => {
        if (!booking || newStatus === booking.status) return;
        updateBookingStatus({ bookingId: booking.id, newStatus });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            PENDING: 'bg-yellow-500',
            CONFIRMED: 'bg-green-500',
            CANCELLED: 'bg-red-500',
            COMPLETED: 'bg-blue-500'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-500';
    };

    if (!booking) return null;

    if (isOwner()) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between",
                            getStatusColor(booking.status),
                            "text-white hover:text-white hover:opacity-90 rounded-full"
                        )}
                        disabled={isUpdating}
                    >
                        {booking.status.toLowerCase()}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        {availableStatuses.length > 0 ? (
                            <CommandList>
                                <CommandGroup>
                                    {availableStatuses.map((status) => (
                                        <React.Fragment key={status}>
                                            <CommandItem
                                                value={status}
                                                onSelect={handleStatusUpdate}
                                                className="cursor-pointer"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        booking.status === status ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {status.toLowerCase()}
                                            </CommandItem>
                                            <CommandSeparator />
                                        </React.Fragment>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        ) : (
                            <CommandEmpty>No further status updates available.</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Badge className={cn(getStatusColor(booking.status), "text-white")}>
            {booking.status.toLowerCase()}
        </Badge>
    );
};

export default StatusBadge;