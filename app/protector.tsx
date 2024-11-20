'use client';
import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useAuthStore } from './lib/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
    const router = useRouter();
    const { token, role } = useAuthStore();

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
            router.push('/unauthorized');
            return;
        }
    }, [token, role, allowedRoles]);

    if (!token) {
        return null;
    }

    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
        return null;
    }

    return <>{children}</>;
}