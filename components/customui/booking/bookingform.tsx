import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Updated base schema to include startDate and endDate
const baseBookingSchema = z.object({
  pickUpLocation: z.string().min(1, "Pickup location is required"),
  totalAmount: z.string().min(1, "Total amount is required"),
  machineId: z.string(),
  customerId: z.string(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

// Create type-specific schemas with additional fields
const hourlyBookingSchema = baseBookingSchema.extend({
  calculationType: z.literal("HOURLY"),
  hours: z.number().min(1, "Number of hours is required"),
});

const dailyBookingSchema = baseBookingSchema.extend({
  calculationType: z.literal("DAILY"),
});

const distanceBookingSchema = baseBookingSchema.extend({
  calculationType: z.literal("DISTANCE_BASED"),
  distance: z.number().min(1, "Distance is required"),
});

// Combine them into a discriminated union
const bookingSchema = z.discriminatedUnion("calculationType", [
  hourlyBookingSchema,
  dailyBookingSchema,
  distanceBookingSchema,
]);

type BookingRequest = z.infer<typeof bookingSchema>;


export function BookingForm({
  onSubmit,
  isLoading,
  machineId,
  customerId,
  priceCalculationType,
  basePrice
}: {
  onSubmit: (data: BookingRequest) => void;
  isLoading?: boolean;
  machineId: string;
  customerId: string;
  priceCalculationType: string;
  basePrice: string;
}) {
  const form = useForm<BookingRequest>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      calculationType: priceCalculationType as "HOURLY" | "DAILY" | "DISTANCE_BASED",
      pickUpLocation: "",
      totalAmount: "",
      machineId,
      customerId,
      startDate: "",
      endDate: "",
      ...(priceCalculationType === "HOURLY" ? { hours: 0 } :
        priceCalculationType === "DISTANCE_BASED" ? { distance: 0 } : {})
    },
  });

  // Watch relevant fields for auto-calculation
  const hours = form.watch("hours");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const distance = form.watch("distance");

  // Calculate total whenever dependent fields change
  useEffect(() => {
    const baseprice = parseFloat(basePrice);
    let total = 0;

    switch (priceCalculationType) {
      case "HOURLY":
        if (hours && startDate && endDate) {
          total = baseprice * hours;
        }
        break;
      case "DAILY":
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
          if (days > 0) {
            total = baseprice * days;
          }
        }
        break;
      case "DISTANCE_BASED":
        if (distance && startDate && endDate) {
          total = baseprice * distance;
        }
        break;
    }

    form.setValue("totalAmount", total.toString(), { shouldValidate: true });
  }, [hours, startDate, endDate, distance, basePrice, priceCalculationType, form]);

  // Helper function to format price calculation type for display
  const formatPriceType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // Helper function to format the rate description
  const getRateDescription = () => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(parseFloat(basePrice));

    switch (priceCalculationType) {
      case "HOURLY":
        return `${formattedPrice}/hour`;
      case "DAILY":
        return `${formattedPrice}/day`;
      case "DISTANCE_BASED":
        return `${formattedPrice}/km`;
      default:
        return formattedPrice;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Machine Booking Form</CardTitle>
            <CardDescription className="mt-2">
              Book your machine with the following rates
            </CardDescription>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-sm font-medium">Pricing Details</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {formatPriceType(priceCalculationType)}
            </div>
            <div className="mt-1 text-lg font-semibold text-primary">
              {getRateDescription()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rest of the form content remains exactly the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date Field */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date Field */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                          disabled={(date) => 
                            date < new Date(form.getValues("startDate") || new Date())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional Fields Based on Calculation Type */}
              {priceCalculationType === "HOURLY" && (
                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Hours</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter hours"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {priceCalculationType === "DISTANCE_BASED" && (
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter distance"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Pickup Location */}
              <FormField
                control={form.control}
                name="pickUpLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total Amount */}
              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Total amount"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Booking"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}