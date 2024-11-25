'use client';
import { CategoryListResponse, MachineResponse, MachineUpdateRequest } from "@/app/lib/definitions";
import { getAllCategories, getMachineById, getMachineConditions, updateMachine } from "@/app/lib/service";
import MachineUpdateForm from "@/app/ui/machines/machineUpdateForm";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function UpdateMachine() {

    const params = useParams();
    const machineId = params.id as string;
    const router = useRouter();

    const [Machine, setMachine] = useState<MachineResponse>();
    const [machineConditions, setMachineConditions] = useState<string[]>([]);
    const [categoriesList, setCategoriesList] = useState<CategoryListResponse[]>([]);
    const [isLoadingMachine, setIsLoadingMachine] = useState<boolean>(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    async function handleUpdateMachine(data: MachineUpdateRequest) {
        try {
            console.log(data);
            setIsLoadingUpdate(true);
            const response = await updateMachine(machineId, data);
            toast({
                title:"Updated successfully",
                description: response,
                variant:"default"
            })
            router.push("/dashboard/profile");
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to Update machine');
        } finally {
            setIsLoadingUpdate(false);
        }
    };

    useEffect(() => {
        async function getMachine() {
            try {
                setIsLoadingMachine(true);
                setError(null);
                const data = await getMachineById(machineId);
                setMachine(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load machine');
            } finally {
                setIsLoadingMachine(false);
            }
        };
        async function getConditions() {
            try {
                setIsLoadingMachine(true);
                const response = await getMachineConditions();
                setMachineConditions(response);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to get conditions');
                toast({
                    title: "Error",
                    description: "Failed to get conditions",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingMachine(false);
            }
        }
        async function getCategories() {
            try {
                setIsLoadingMachine(true);
                setError(null);
                const data = await getAllCategories();
                setCategoriesList(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load categories');
                toast({
                    title: "Error",
                    description: "Failed to load categories",
                    variant: "destructive",
                });
            } finally {
                setIsLoadingMachine(false);
            }
        }

        getMachine();
        getConditions();
        getCategories();
    }, []);

    if (!Machine) {
        return <div>Loading machine details...</div>;
    }

    return (
        <>
            <MachineUpdateForm
                onSubmit={handleUpdateMachine}
                machine={Machine}
                categoriesList={categoriesList}
                machineConditions={machineConditions}
                isLoadingUpdate={isLoadingUpdate}
                isLoadingMachine={isLoadingMachine}
            />
        </>
    )
}