'use client'
import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { addDays, format, isWithinInterval, parseISO } from 'date-fns'
import { BookingListResponse } from '@/lib/definitions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CalendarView({
    existingBookings
}: {
    existingBookings: BookingListResponse[]
}) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const bookedDates = existingBookings.filter(
        booking => ['CONFIRMED', 'ONGOING','PENDING'].includes(booking.status)
    )

    // Function to determine if a date is booked
    const isDateBooked = (date: Date) => {
        return bookedDates.some(booking =>
            isWithinInterval(date, {
                start: parseISO(booking.startDate),
                end: parseISO(booking.endDate)
            })
        )
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Check Availability</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        className="rounded-md border w-full [&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-table]:table-fixed"
                        classNames={{
                            table: "w-full table-fixed",
                            head_row: "w-full grid grid-cols-7",
                            row: "grid grid-cols-7 w-full",
                            cell: "text-center p-1 aspect-square",
                            day: "w-full h-full rounded-full"
                        }}
                        modifiers={{
                            disabled: isDateBooked
                        }}
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        modifiersClassNames={{
                            disabled: 'text-red-500 bg-orange-200 line-through',
                            selected: 'bg-green-500'
                        }}
                    />
                </CardContent>
            </Card>

        </>

    )
}