'use client';
import CustomerDetails from "@/components/custom-ui/dashboard/Customer/MainPage";
import AdminDetails from "@/components/custom-ui/dashboard/Admin/MainPage";
import { useAuthStore } from "../../lib/store";
import { ProtectedRoute } from "../protector";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { userAPI } from "@/lib/service";
import { Spinner } from "@/components/ui/spinner";
import OwnerDetails from "@/components/custom-ui/dashboard/Owner/MainPage";
import { allRoles } from "@/lib/utils";


export default function Dashboard() {
    const { role } = useAuthStore();

    const {
        data: userDetails,
        isLoading: isProfileLoading,
        error: profileError
    } = useQuery({
        queryKey: ['user', 'profile'],
        queryFn: userAPI.getLoggedUserProfile,
        retry: 1
    });

    if (isProfileLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="w-8 h-8" />
            </div>
        );
    }

    if (profileError) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertDescription>
                    {profileError instanceof Error
                        ? profileError.message
                        : 'Failed to load user profile'}
                </AlertDescription>
            </Alert>
        );
    }

    const getDashboardComponent = () => {
        switch (role) {
            case 'CUSTOMER':
                return <CustomerDetails data={userDetails!} />;
            case 'ADMIN':
                return <AdminDetails data={userDetails!} />;
            case 'COLLECTOR':
                return <OwnerDetails data={userDetails!} />;
            default:
                return null;
        }
    }

    return (
        <ProtectedRoute allowedRoles={allRoles}>
            {getDashboardComponent()}
        </ProtectedRoute>
    );
}