'use client';
import { ProtectedRoute } from "@/app/protector";
import MaintenanceRecordForm from "@/components/custom-ui/maintenancerecord/maintenancerecordform";
import { toast } from "@/hooks/use-toast";
import { MaintenanceRecordRequest, MaintenanceRecordResponse } from "@/lib/definitions";
import { maintenanceAPI } from "@/lib/service";
import { owner } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";


interface MaintenanceFormData extends MaintenanceRecordRequest {
  file: File;
}

export default function ProtectedMaintenanceRecordPage() {
  return (
    <ProtectedRoute allowedRoles={owner}>
      <MaintenanceRecordPage />
    </ProtectedRoute>
  );
}
function MaintenanceRecordPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const machineId = params.machineId as string;

  const { mutate: addMaintenanceRecord, isPending: isAddingRecord } = useMutation({
    mutationFn: async (formData: MaintenanceFormData) => {
      const { file, ...data } = formData;
      return maintenanceAPI.createMaintenanceRecord(machineId, data, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['maintenanceRecords', machineId]
      });
      
      toast({
        title: "Success!",
        description: "Maintenance record has been added successfully",
        variant: "default"
      });
      
      router.push(`/dashboard/profile`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to add maintenance record",
        variant: "destructive"
      });
    }
  });

  const handleFormSubmit = async (data: MaintenanceFormData) => {
    await addMaintenanceRecord(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add Maintenance Record
          </h1>
          <p className="text-muted-foreground mt-2">
            Add the details for the maintenance that has been done to your machine
          </p>
        </div>
        
        <MaintenanceRecordForm 
          onSubmit={handleFormSubmit}
          isSubmitting={isAddingRecord}
        />
      </div>
    </div>
  );
} 