import { useRouter } from "next/navigation";
import { useAuthStore } from "./store";
import { useEffect } from "react";

export default function useRequireAuth(roleRequired: string) {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const role = useAuthStore((state) => state.role);

    useEffect(() => {
        if (!token) {
            // Save the intended page for post-login redirection
            const currentPath = window.location.pathname;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        } else if (roleRequired && role !== roleRequired) {
            // Redirect if the user does not have the required role
            router.push('/403'); // Assuming a 403 page for "Forbidden" access
        }
    }, [token, role, router, roleRequired]);
}


export function shortenDescription(description: string) {
    const maxlength: number = 100

    if (description.length <= maxlength) {
        return description
    }
    return description.slice(0, maxlength - 3) + "..."
}

