'use client';
import { MachineRequest } from "@/app/lib/definitions";
import { createMachine } from "@/app/lib/service";
import { owner } from "@/app/lib/utils";
import { ProtectedRoute } from "@/app/protector";
import MachineForm from "@/app/ui/machines/machineForm";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useMachineStore } from "@/app/lib/store";

export default function ProtectedAddMachine() {
    return (
        <ProtectedRoute allowedRoles={owner}>
            <AddMachine />
        </ProtectedRoute>
    )
}

function AddMachine() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setIsAddingImages } = useMachineStore();

    async function handleAddMachine(data: MachineRequest) {
        try {
            setIsLoading(true);
            const response = await createMachine(data);
            toast({
                title: "Machine created successfully",
                description: "Add images for your machine",
            });

            const id = String(response.id);
            router.push(`/machines/${id}/uploadImages`);
        } catch (error) {
            setIsAddingImages(false); // Reset on error
            toast({
                title: "Machine creation failed",
                description:
                    error instanceof Error ? error.message : "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Add Machine</h1>

            <Alert variant="default">
                <Info className="h-4 w-4" />
                <AlertTitle>Machine Condition Guide</AlertTitle>
                <AlertDescription>
                    <div className="space-y-2">
                        <p className="font-semibold">Understanding Machine Conditions:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                <span className="font-medium">EXCELLENT:</span> Like new condition.
                            </li>
                            <li>
                                <span className="font-medium">GOOD:</span> Well-maintained.
                            </li>
                            <li>
                                <span className="font-medium">FAIR:</span> Shows significant wear.
                            </li>
                            <li>
                                <span className="font-medium">POOR:</span> Extensive wear.
                            </li>
                        </ul>
                    </div>
                </AlertDescription>
            </Alert>

            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Category Selection Important</AlertTitle>
                <AlertDescription>
                    <div className="space-y-2">
                        <p>
                            Before adding a machine, please review our
                            <Link
                                href="/categories"
                                className="font-semibold text-blue-600 ml-1 hover:underline"
                            >
                                Categories Page
                            </Link>
                        </p>
                        <p>
                            Understanding the correct category is crucial for:
                            <ul className="list-disc pl-5 mt-1">
                                <li>Accurate machine classification</li>
                                <li>Proper pricing and valuation</li>
                                <li>Easier searchability for potential buyers</li>
                            </ul>
                        </p>
                        <p className="italic text-sm">
                            Incorrect categorization may lead to delayed listing or potential removal.
                        </p>
                    </div>
                </AlertDescription>
            </Alert>

            <MachineForm onSubmit={handleAddMachine} isLoading={isLoading} />
        </div>
    );
}
