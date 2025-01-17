import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
    token: string | null;
    role: string | null;
    setToken: (token: string) => void;
    setRole: (role: string) => void;
    logout: () => void;

}

interface MachineState {
    isAddingImages: boolean;
    setIsAddingImages: (value: boolean) => void;
}

export const useMachineStore = create<MachineState>((set) => ({
    isAddingImages: false,
    setIsAddingImages: (value) => set({ isAddingImages: value })
})
)
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            token: null,
            role: null,
            setToken: (token) => set({ token }),
            setRole: (role) => set({ role }),
            logout: () => set({ token: null, role: null })
        }),
        {
            name: 'auth-storage',
        }
    )
);
