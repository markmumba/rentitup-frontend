'use client';
import CustomerDetails from "../ui/Dashboard/Customer/MainPage";
import OwnerDetails from "../ui/Dashboard/Owner/MainPage";
import AdminDetails from "../ui/Dashboard/Admin/MainPage";
import { useAuthStore } from "../lib/store";
import { ProtectedRoute } from "../protector";
import { allRoles } from "../lib/utils";


export default function Dashboard() {
    const { role } = useAuthStore();
  
    const getDashboardComponent = () => {
      switch (role) {
        case 'CUSTOMER':
          return <CustomerDetails />;
        case 'OWNER':
          return <OwnerDetails />;
        case 'ADMIN':
          return <AdminDetails />;
        default:
          return null;
      }
    };
  
    return (
      <ProtectedRoute allowedRoles={allRoles}>
        {getDashboardComponent()}
      </ProtectedRoute>
    );
  }