'use client';
import { admin } from "@/lib/utils";
import { ProtectedRoute } from "@/app/protector";
import { UserList } from "@/components/custom-ui/dashboard/admin/userlist";


export default function UserListPage() {
    return (
        <ProtectedRoute allowedRoles={admin}>
            <UserList/>
        </ProtectedRoute>
    );
}