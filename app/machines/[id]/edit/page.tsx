'use client';
import { CategoryListResponse, MachineResponse, MachineUpdateRequest } from "@/lib/definitions";
import { machineAPI, categoryAPI } from "@/lib/service"; // Assuming this is where your API functions are exported
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MachineUpdateForm from "@/components/custom-ui/machines/machineUpdateForm";

export default function UpdateMachine() {
    const params = useParams();
    const machineId = params.id as string;
    const router = useRouter();
    const queryClient = useQueryClient();

    // Query for machine details
    const { 
        data: machine,
        isLoading: isLoadingMachine 
    } = useQuery({
        queryKey: ['machine', machineId],
        queryFn: () => machineAPI.getMachineById(machineId)
    });

    // Query for machine conditions
    const { 
        data: machineConditions = [],
        isLoading: isLoadingConditions 
    } = useQuery({
        queryKey: ['machineConditions'],
        queryFn: machineAPI.getMachineConditions
    });

    // Query for categories
    const { 
        data: categoriesList = [],
        isLoading: isLoadingCategories 
    } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryAPI.getAllCategories
    });

    // Mutation for updating machine
    const { mutate: updateMachineMutation, isPending: isLoadingUpdate } = useMutation({
        mutationFn: (data: MachineUpdateRequest) => 
            machineAPI.updateMachine(machineId, data),
        onSuccess: () => {
            toast({
                title: "Updated successfully",
                description: "Machine has been updated",
                variant: "default"
            });

            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['machine', machineId] });
            queryClient.invalidateQueries({ queryKey: ['machines'] });

            router.push("/dashboard/profile");
        },
        onError: (error) => {
            toast({
                title: "Update failed",
                description: error instanceof Error ? error.message : "Failed to update machine",
                variant: "destructive",
            });
        }
    });

    const handleUpdateMachine = (data: MachineUpdateRequest) => {
        updateMachineMutation(data);
    };

    // Combine loading states
    const isLoading = isLoadingMachine || isLoadingConditions || isLoadingCategories;

    if (isLoading || !machine) {
        return <div>Loading machine details...</div>;
    }

    return (
        <MachineUpdateForm
            onSubmit={handleUpdateMachine}
            machine={machine}
            categoriesList={categoriesList}
            machineConditions={machineConditions}
            isLoadingUpdate={isLoadingUpdate}
            isLoadingMachine={isLoading}
        />
    );
}