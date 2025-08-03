import axios from "axios";
import { useAuthStore } from "./store";
import { BookingListResponse, BookingRequest, BookingResponse, CategoryListResponse, CategoryRequest, CategoryResponse, CollectorVerificationRequest, ForgotPasswordRequest, LoginRequest, LoginResponse, MachineListResponse, MachineRequest, MachineResponse, MachineUpdateRequest, MaintenanceRecordRequest, MaintenanceRecordResponse, RegisterRequest, ResetPasswordRequest, ReviewRequest, UserDetails, UserDetailsList } from "./definitions";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function getHeader() {
    const token = useAuthStore.getState().token;
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
}

export const authAPI = {
    // Register a new user
    register: async (registerData: RegisterRequest): Promise<UserDetails> => {
        try {
            const response = await axios.post<UserDetails>(
                `${BASE_URL}/auth/register`,
                registerData
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Registration failed. Please try again.");
            }
            throw new Error("An unexpected error occurred during registration.");
        }
    },

    // Login user with credentials
    login: async (loginData: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await axios.post<LoginResponse>(
                `${BASE_URL}/auth/login`,
                loginData
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Login failed. Please try again.");
            }
            throw new Error("An unexpected error occurred during login.");
        }
    },

    // Initiate password reset process
    forgotPassword: async (email: string): Promise<string> => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/forgot-password`,
                { email } as ForgotPasswordRequest
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to process password reset request.");
            }
            throw new Error("An unexpected error occurred while processing your request.");
        }
    },

    // Complete password reset with token
    resetPassword: async (token: string, newPassword: string): Promise<string> => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/reset-password`,
                { token, newPassword } as ResetPasswordRequest
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Password reset failed.");
            }
            throw new Error("An unexpected error occurred while resetting your password.");
        }
    },

    // Upload verification documents for collectors
    uploadVerification: async (registrationId: string, formData: FormData): Promise<string> => {
        try {
            // Get the nationalId from FormData instead of URL params
            const response = await axios.post(
                `${BASE_URL}/auth/upload-verification`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to upload verification documents.");
            }
            throw new Error("An unexpected error occurred while uploading documents.");
        }
    }
};







export const userAPI = {
    // Get all users (admin endpoint)
    getAllUsers: async (): Promise<UserDetailsList[]> => {
        const response = await axios.get(
            `${BASE_URL}/users`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // Get specific user by ID
    getUserById: async (id: string): Promise<UserDetails> => {
        const response = await axios.get(
            `${BASE_URL}/users/${id}`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // Get logged-in user's profile
    getLoggedUserProfile: async (): Promise<UserDetails> => {
        const response = await axios.get(
            `${BASE_URL}/users/user-profile`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // Update user profile (supports file upload)
    updateUser: async (id: string, formData: FormData): Promise<UserDetails> => {
        const response = await axios.put(
            `${BASE_URL}/users/${id}`,
            formData,
            {
                headers: {
                    ...getHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },

    // Delete user
    deleteUser: async (id: string): Promise<string> => {
        const response = await axios.delete(
            `${BASE_URL}/users/${id}`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // collector verification related endpoints

    collectors: {

        // Get unverified collectors
        getUnverified: async (): Promise<UserDetails[]> => {
            const response = await axios.get(
                `${BASE_URL}/users/unverified-users`,
                { headers: getHeader() }
            );
            return response.data;
        },

        // Verify or reject a collector
        verifyCollector: async (collectorId: string, verify: boolean): Promise<string> => {
            const response = await axios.post(
                `${BASE_URL}/users/verify-collector`,
                { id: collectorId, status: verify } as CollectorVerificationRequest,
                { headers: getHeader() }
            );
            return response.data;
        }
    }
};


export const categoryAPI = {
    // Get all categories (public endpoint)
    getAllCategories: async (): Promise<CategoryListResponse[]> => {
        const response = await axios.get<CategoryListResponse[]>(
            `${BASE_URL}/categories`
        );
        return response.data;
    },

    // Get category by ID (public endpoint)
    getCategoryById: async (id: string): Promise<CategoryResponse> => {
        const response = await axios.get<CategoryResponse>(
            `${BASE_URL}/categories/${id}`
        );
        return response.data;
    },

    // Create new category (protected endpoint)
    createCategory: async (categoryRequest: CategoryRequest): Promise<CategoryResponse> => {
        try {
            const response = await axios.post<CategoryResponse>(
                `${BASE_URL}/categories`,
                categoryRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to create category.");
            }
            throw new Error("An unexpected error occurred while creating category.");
        }
    },

    // Update category (protected endpoint)
    updateCategory: async (id: string, categoryRequest: CategoryRequest): Promise<CategoryResponse> => {
        try {
            const response = await axios.put<CategoryResponse>(
                `${BASE_URL}/categories/${id}`,
                categoryRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to update category.");
            }
            throw new Error("An unexpected error occurred while updating category.");
        }
    },

    // Delete category (protected endpoint)
    deleteCategory: async (id: string): Promise<string> => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/categories/${id}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to delete category.");
            }
            throw new Error("An unexpected error occurred while deleting category.");
        }
    },


};

export const bookingAPI = {
    // Get all bookings (protected endpoint - admin only)
    getAllBookings: async (): Promise<BookingListResponse[]> => {
        try {
            const response = await axios.get<BookingListResponse[]>(
                `${BASE_URL}/bookings`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch bookings.");
            }
            throw new Error("An unexpected error occurred while fetching bookings.");
        }
    },

    // Create new booking (protected endpoint)
    createBooking: async (bookingRequest: BookingRequest): Promise<BookingResponse> => {
        try {
            const response = await axios.post<BookingResponse>(
                `${BASE_URL}/bookings`,
                bookingRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Booking failed. Please try again.");
            }
            throw new Error("An unexpected error occurred while creating booking.");
        }
    },

    // Get booking by ID (protected endpoint)
    getBookingById: async (id: string): Promise<BookingResponse> => {
        try {
            const response = await axios.get<BookingResponse>(
                `${BASE_URL}/bookings/${id}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch booking.");
            }
            throw new Error("An unexpected error occurred while fetching booking.");
        }
    },

    // Get bookings by user (protected endpoint)
    getBookingsByUser: async (userId: string): Promise<BookingListResponse[]> => {
        try {
            const response = await axios.get<BookingListResponse[]>(
                `${BASE_URL}/bookings/user/${userId}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch user bookings.");
            }
            throw new Error("An unexpected error occurred while fetching user bookings.");
        }
    },

    // Get bookings for owner (protected endpoint)
    getBookingsForOwner: async (ownerId: string): Promise<BookingListResponse[]> => {
        try {
            const response = await axios.get<BookingListResponse[]>(
                `${BASE_URL}/bookings/owner/${ownerId}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch owner bookings.");
            }
            throw new Error("An unexpected error occurred while fetching owner bookings.");
        }
    },

    // Get bookings by status (protected endpoint)
    getBookingsByStatus: async (userId: string, status: string): Promise<BookingListResponse[]> => {
        try {
            const response = await axios.get<BookingListResponse[]>(
                `${BASE_URL}/bookings/user/${userId}/status?status=${status}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch bookings by status.");
            }
            throw new Error("An unexpected error occurred while fetching bookings.");
        }
    },

    // Get bookings by machine (protected endpoint)
    getBookingsByMachine: async (machineId: string): Promise<BookingListResponse[]> => {
        try {
            const response = await axios.get<BookingListResponse[]>(
                `${BASE_URL}/bookings/machine/${machineId}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch machine bookings.");
            }
            throw new Error("An unexpected error occurred while fetching machine bookings.");
        }
    },

    // Update booking (protected endpoint)
    updateBooking: async (id: string, bookingRequest: BookingRequest): Promise<BookingResponse> => {
        try {
            const response = await axios.put<BookingResponse>(
                `${BASE_URL}/bookings/${id}`,
                bookingRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to update booking.");
            }
            throw new Error("An unexpected error occurred while updating booking.");
        }
    },

    // Delete booking (protected endpoint)
    deleteBooking: async (id: string): Promise<string> => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/bookings/${id}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to delete booking.");
            }
            throw new Error("An unexpected error occurred while deleting booking.");
        }
    },

    // Update booking status (protected endpoint)
    updateStatus: async (id: string, status: string): Promise<string> => {
        try {
            const response = await axios.put(
                `${BASE_URL}/bookings/${id}/status-update?status=${status}`,
                {},
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to update booking status.");
            }
            throw new Error("An unexpected error occurred while updating status.");
        }
    },

    // Get booking by code (protected endpoint)
    getBookingByCode: async (code: string): Promise<BookingListResponse> => {
        try {
            const response = await axios.get<BookingListResponse>(
                `${BASE_URL}/bookings/get-by-code?code=${code}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch booking by code.");
            }
            throw new Error("An unexpected error occurred while fetching booking.");
        }
    },

    // Get booking status list (protected endpoint)
    getBookingStatusList: async (): Promise<string[]> => {
        try {
            const response = await axios.get<string[]>(
                `${BASE_URL}/bookings/booking-status-list`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch booking status list.");
            }
            throw new Error("An unexpected error occurred while fetching status list.");
        }
    }
};

export const reviewAPI = {
    // Get reviews for machine (public endpoint)
    getReviewsForMachine: async (machineId: string): Promise<ReviewRequest[]> => {
        try {
            const response = await axios.get<ReviewRequest[]>(
                `${BASE_URL}/reviews/machine/${machineId}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch machine reviews.");
            }
            throw new Error("An unexpected error occurred while fetching reviews.");
        }
    },

    // Get review by ID (public endpoint)
    getReviewById: async (id: string): Promise<ReviewRequest> => {
        try {
            const response = await axios.get<ReviewRequest>(
                `${BASE_URL}/reviews/${id}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to fetch review.");
            }
            throw new Error("An unexpected error occurred while fetching review.");
        }
    },

    // Create review (protected endpoint)
    createReview: async (bookingId: string, reviewRequest: ReviewRequest): Promise<ReviewRequest> => {
        try {
            const response = await axios.post<ReviewRequest>(
                `${BASE_URL}/bookings/${bookingId}/reviews`,
                reviewRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to create review.");
            }
            throw new Error("An unexpected error occurred while creating review.");
        }
    },

    // Update review (protected endpoint)
    updateReview: async (id: string, reviewRequest: ReviewRequest): Promise<ReviewRequest> => {
        try {
            const response = await axios.put<ReviewRequest>(
                `${BASE_URL}/reviews/${id}`,
                reviewRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to update review.");
            }
            throw new Error("An unexpected error occurred while updating review.");
        }
    },

    // Delete review (protected endpoint)
    deleteReview: async (id: string): Promise<string> => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/reviews/${id}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to delete review.");
            }
            throw new Error("An unexpected error occurred while deleting review.");
        }
    }
};

export const machineAPI = {
    // Get all machines (protected endpoint)
    getAllMachines: async (): Promise<MachineListResponse[]> => {
        const response = await axios.get<MachineListResponse[]>(
            `${BASE_URL}/machines`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // Get machine by ID (public endpoint)
    getMachineById: async (id: string): Promise<MachineResponse> => {
        const response = await axios.get<MachineResponse>(
            `${BASE_URL}/machines/${id}`
        );
        return response.data;
    },

    // Get machines by owner (protected endpoint)
    getMachinesByOwner: async (ownerId: string): Promise<MachineListResponse[]> => {
        const response = await axios.get<MachineListResponse[]>(
            `${BASE_URL}/machines/owners/${ownerId}`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // Create new machine (protected endpoint)
    createMachine: async (machineRequest: MachineRequest): Promise<MachineResponse> => {
        try {
            const response = await axios.post<MachineResponse>(
                `${BASE_URL}/machines`,
                machineRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to create machine.");
            }
            throw new Error("An unexpected error occurred while creating machine.");
        }
    },

    // Update machine (protected endpoint)
    updateMachine: async (id: string, machineRequest: MachineUpdateRequest): Promise<MachineResponse> => {
        try {
            const response = await axios.put<MachineResponse>(
                `${BASE_URL}/machines/${id}`,
                machineRequest,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to update machine.");
            }
            throw new Error("An unexpected error occurred while updating machine.");
        }
    },

    // Delete machine (protected endpoint)
    deleteMachine: async (id: string): Promise<string> => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/machines/${id}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to delete machine.");
            }
            throw new Error("An unexpected error occurred while deleting machine.");
        }
    },

    // Search machines (public endpoint)
    searchMachines: async (searchTerm: string): Promise<MachineListResponse[]> => {
        const response = await axios.get<MachineListResponse[]>(
            `${BASE_URL}/machines/search?nameOfMachine=${searchTerm}`
        );
        return response.data;
    },

    // Get machine conditions (protected endpoint)
    getMachineConditions: async (): Promise<string[]> => {
        const response = await axios.get<string[]>(
            `${BASE_URL}/machines/machineConditions`,
            { headers: getHeader() }
        );
        return response.data;
    },

    // Toggle machine availability (protected endpoint)
    toggleAvailability: async (id: string): Promise<string> => {
        const response = await axios.post(
            `${BASE_URL}/machines/change-availability`,
            { id },
            { headers: getHeader() }
        );
        return response.data;
    },

    // Machine images related endpoints
    images: {
        // Upload machine images (protected endpoint)
        upload: async (machineId: string, formData: FormData): Promise<string> => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/machines/${machineId}/images`,
                    formData,
                    {
                        headers: {
                            ...getHeader(),
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data?.message || "Failed to upload images.");
                }
                throw new Error("An unexpected error occurred while uploading images.");
            }
        },

        // Get machine images (public endpoint)
        getAll: async (machineId: string): Promise<string[]> => {
            const response = await axios.get<string[]>(
                `${BASE_URL}/machines/${machineId}/images`
            );
            return response.data;
        },

        // Delete machine image (protected endpoint)
        delete: async (machineId: string, imageId: string): Promise<string> => {
            const response = await axios.delete(
                `${BASE_URL}/machines/${machineId}/images/${imageId}`,
                { headers: getHeader() }
            );
            return response.data;
        },

        // Set primary image (protected endpoint)
        setPrimary: async (machineId: string, imageId: string): Promise<string> => {
            const response = await axios.put(
                `${BASE_URL}/machines/${machineId}/images/${imageId}/primary`,
                {},
                { headers: getHeader() }
            );
            return response.data;
        }
    }
};



/**
 * Endpoints associated with maintenance records
 */

export const maintenanceAPI = {
    createMaintenanceRecord: async (
        machineId: string,
        request: MaintenanceRecordRequest,
        file: File
    ): Promise<MaintenanceRecordResponse> => {
        try {
            // First create the maintenance record
            const jsonResponse = await axios.post<MaintenanceRecordResponse>(
                `${BASE_URL}/machines/${machineId}/maintenance-records/json`,
                request,
                {
                    headers: {
                        ...getHeader(),
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Then upload the file
            const formData = new FormData();
            formData.append('file', file);

            await axios.post(
                `${BASE_URL}/maintenance-records/${jsonResponse.data.id}/file`,
                formData,
                {
                    headers: {
                        ...getHeader(),
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return jsonResponse.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to create maintenance record.");
            }
            throw new Error("An unexpected error occurred while creating maintenance record.");
        }
    },


    getUncheckedMaintenanceRecords: async (): Promise<MaintenanceRecordResponse[]> => {
        const response = await axios.get<MaintenanceRecordResponse[]>(
            `${BASE_URL}/maintenance-records`,
            { headers: getHeader() }
        );
        return response.data;
    },

    getMaintenanceRecordById: async (id: string): Promise<MaintenanceRecordResponse> => {
        const response = await axios.get<MaintenanceRecordResponse>(
            `${BASE_URL}/maintenance-records/${id}`,
            { headers: getHeader() }
        );
        return response.data;
    },

    getMachineMaintenanceRecords: async (machineId: string): Promise<MaintenanceRecordResponse[]> => {
        const response = await axios.get<MaintenanceRecordResponse[]>(
            `${BASE_URL}/machines/${machineId}/maintenance-records`,
            { headers: getHeader() }
        );
        return response.data;
    },

    updateMaintenanceRecord: async (
        id: string,
        request: MaintenanceRecordRequest
    ): Promise<string> => {
        try {
            const response = await axios.put<string>(
                `${BASE_URL}/maintenance-records/${id}`,
                request,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to update maintenance record.");
            }
            throw new Error("An unexpected error occurred while updating maintenance record.");
        }
    },

    deleteMaintenanceRecord: async (id: string): Promise<string> => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/maintenance-records/${id}`,
                { headers: getHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || "Failed to delete maintenance record.");
            }
            throw new Error("An unexpected error occurred while deleting maintenance record.");
        }
    },

    verifyRecord: async (id: string): Promise<MaintenanceRecordResponse> => {
        const response = await axios.patch<MaintenanceRecordResponse>(
            `${BASE_URL}/maintenance-records/${id}/verify`,
            {},
            { headers: getHeader() }
        );
        return response.data;
    }
};





/** Role-related functions */

export function isAuthenticated() {
    const token = useAuthStore.getState().token;
    return !!token;
}

export function isAdmin() {
    const role = useAuthStore.getState().role;
    return role === "ADMIN";
}

export function isOwner() {
    const role = useAuthStore.getState().role;
    return role === "OWNER";
}

export function isCustomer() {
    const role = useAuthStore.getState().role;
    return role === "CUSTOMER";
}
