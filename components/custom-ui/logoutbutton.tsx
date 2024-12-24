import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
    const router = useRouter();
    const logoutFn = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logoutFn();  
        router.push('/');  
    };

    return (
        <Button variant="ghost" onClick={handleLogout}>
            Logout
        </Button>
    );
}