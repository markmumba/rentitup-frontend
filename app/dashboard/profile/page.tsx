"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BanknoteIcon, Info, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/app/protector";
import { allRoles } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { isOwner, machineAPI, userAPI } from "@/lib/service";
import Image from "next/image";
import MachineCard from "@/components/customui/machines/machinecard";

export default function ProtectedProfile() {
  return (
    <ProtectedRoute allowedRoles={allRoles}>
      <Profile />
    </ProtectedRoute>
  );
}

function Profile() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState<string | null>(null);

  // Query for user profile data
  const {
    data: userDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userAPI.getLoggedUserProfile,
  });

  console.log(userDetails);

  // Mutation for deleting a machine
  const deleteMachineMutation = useMutation({
    mutationFn: (machineId: string) => machineAPI.deleteMachine(machineId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setShowDeleteDialog(false);
      setMachineToDelete(null);
    },
  });
  const handleDeleteClick = (machineId: string) => {
    setMachineToDelete(machineId);
    setShowDeleteDialog(true);
  };

  const handleUpdateMachine = (machineId: string) => {
    router.push(`/machines/${machineId}/edit`);
  };

  const handleAddMachine = () => {
    router.push(`/machines/add`);
  };

  const handleDeleteConfirm = async () => {
    if (machineToDelete) {
      deleteMachineMutation.mutate(machineToDelete);
    }
  };

  const handleMachineClick = (machineId: string) => {
    router.push(`/machines/${machineId}`);
  };

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-red-500">
            Error: {error instanceof Error ? error.message : "Something went wrong"}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto mt-8">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userDetails) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Card */}
      <Card className="max-w-4xl mx-auto">
        {/* Profile card content remains the same */}
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userDetails.fullName} />
              <AvatarFallback>
                {userDetails.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                {userDetails.fullName}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {userDetails.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{userDetails.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>{userDetails.phone}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          {isOwner() && (
            <Button onClick={handleAddMachine} className="text-sm">
              Add machine
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Machines Grid */}
      {userDetails.role === "OWNER" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Machines</h2>
            <Badge variant="outline">
              {userDetails.ownedMachines?.length || 0} machines
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userDetails.ownedMachines?.map((machine) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onDelete={handleDeleteClick}
                onUpdate={handleUpdateMachine}
                onClick={handleMachineClick}
                onAddMaintenanceRecords={(id: any) =>
                  router.push(`/machines/${id}/maintenance-record/add`)
                }
              />
            ))}
          </div>
        </div>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              machine.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMachineMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteMachineMutation.isPending}
            >
              {deleteMachineMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}