'use client';
import { useAuthStore } from "@/lib/store";
import { ProtectedRoute } from "../protector";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { userAPI } from "@/lib/service";
import { Spinner } from "@/components/ui/spinner";
import { allRoles } from "@/lib/utils";
import CustomerDetails from "@/components/customui/dashboard/customer/customerdetails";
import AdminDashboard from "@/components/customui/dashboard/admin/admindetails";
import OwnerDetails from "@/components/customui/dashboard/owner/ownerdetails";


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
                return <AdminDashboard data={userDetails!} />;
            case 'OWNER':
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