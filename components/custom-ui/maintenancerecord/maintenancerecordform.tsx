import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Form schema type (what the form handles)
const formSchema = z.object({
    serviceDate: z.string().min(1, { message: "Service date is required" }),
    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description must be less than 500 characters" }),
    performedBy: z.string()
        .min(3, { message: "Performed by must be at least 3 characters long" })
        .max(100, { message: "Performed by must be less than 100 characters" }),
    nextService: z.string()
        .min(1, { message: "Next service date is required" }),
    file: z.custom<FileList>()
        .refine((files) => files?.length > 0, "Image is required")
        .refine(
            (files) => files?.[0]?.size <= 5000000,
            "File size should be less than 5MB"
        )
        .refine(
            (files) => 
                files?.[0] && ["image/jpeg", "image/png", "image/jpg"].includes(files[0].type),
            "Only .jpg, .jpeg, and .png formats are supported"
        )
});

type FormData = z.infer<typeof formSchema>;

interface SubmissionData {
    serviceDate: string;
    description: string;
    performedBy: string;
    nextService: string;
    file: File;
}

interface MaintenanceRecordFormProps {
    onSubmit: (data: SubmissionData) => void;
    isSubmitting?: boolean;
}

export default function MaintenanceRecordForm({ 
    onSubmit,
    isSubmitting  
}: MaintenanceRecordFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serviceDate: "",
            description: "",
            performedBy: "",
            nextService: "",
        }
    });

    const handleSubmit = (values: FormData) => {
        const submissionData: SubmissionData = {
            serviceDate: values.serviceDate,
            description: values.description,
            performedBy: values.performedBy,
            nextService: values.nextService,
            file: values.file[0]
        };
        
        onSubmit(submissionData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="serviceDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Service Date</FormLabel>
                            <FormControl>
                                <Input 
                                    type="date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Describe the maintenance performed"
                                    className="h-32"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide detailed information about the maintenance work performed
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="performedBy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Performed By</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter name of person who performed the maintenance"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nextService"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Next Service Date</FormLabel>
                            <FormControl>
                                <Input 
                                    type="date"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                When should the next maintenance be performed?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Maintenance Record Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            onChange(e.target.files);
                                        }
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload an image of the maintenance record (max 5MB, jpg/png only)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Maintenance Record"}
                </Button>
            </form>
        </Form>
    );
}