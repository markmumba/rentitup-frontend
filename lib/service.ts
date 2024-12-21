import axios from "axios";
import { useAuthStore } from "./store";
import { BookingListResponse, BookingRequest, CategoryListResponse, CategoryRequest, CategoryResponse, CollectorVerificationRequest, ForgotPasswordRequest, LoginRequest, LoginResponse, MachineListResponse, MachineRequest, MachineResponse, MachineUpdateRequest, RegisterRequest, ResetPasswordRequest, ReviewRequest, UserDetails, UserDetailsList } from "./definitions";


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
  


/** Category-related endpoints */

export async function createCategory(categoryRequest: CategoryRequest) {
    const response = await axios.post(`${BASE_URL}/categories`, categoryRequest, {
        headers: getHeader()
    });
    return response.data;
}
export async function getPriceCalculationTypes(): Promise<string[]> {
    const response = await axios.get<string[]>(`${BASE_URL}/categories/calculation-types`, {
        headers: getHeader()
    });
    return response.data;
}

export async function getAllCategories(): Promise<CategoryListResponse[]> {
    const response = await axios.get<CategoryListResponse[]>(`${BASE_URL}/categories`);
    return response.data;
}

export async function getCategoryById(id: string): Promise<CategoryResponse> {
    const response = await axios.get<CategoryResponse>(`${BASE_URL}/categories/${id}`);
    return response.data;
}
export async function updateCategory(categoryId: string, categoryRequest: CategoryRequest) {
    const response = await axios.put(`${BASE_URL}/categories/${categoryId}`, categoryRequest, {
        headers: getHeader()
    });
    return response.data;
}

export async function deleteCategory(categoryId: string) {
    const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`, {
        headers: getHeader()
    });
    return response.data
}


/** Machine-related endpoints */

export async function getAllMachines() {
    const response = await axios.get(`${BASE_URL}/machines`, {
        headers: getHeader()
    });
    return response.data;
}

export async function getMachinesByOwner(ownerId: string) {
    const response = await axios.get(`${BASE_URL}/machines/owners/${ownerId}`, {
        headers: getHeader()
    });
    return response.data;
}

export async function getMachineById(machineId: string): Promise<MachineResponse> {
    const response = await axios.get<MachineResponse>(`${BASE_URL}/machines/${machineId}`);
    return response.data;
}

export async function createMachine(machineRequest: MachineRequest): Promise<MachineResponse> {
    const response = await axios.post<MachineResponse>(`${BASE_URL}/machines`, machineRequest, {
        headers: getHeader()
    });
    return response.data;
}

export async function getMachineBySearch(searchTerm: string): Promise<MachineListResponse[]> {
    const response = await axios.get<MachineListResponse[]>(` ${BASE_URL}/machines/search?nameOfMachine=${searchTerm}`)
    return response.data
}

export async function changeAvailability() {
    const response = await axios.post(`${BASE_URL}/machines/change-availability`, {
        headers: getHeader()
    });
    return response.data;
}

export async function updateMachine(machineId: string, machineRequest: MachineUpdateRequest) {
    const response = await axios.put(`${BASE_URL}/machines/${machineId}`, machineRequest,
        { headers: getHeader() })
    return response.data;
}

export async function deleteMachine(machineId: string) {
    const response = await axios.delete(`${BASE_URL}/machines/${machineId}`, {
        headers: getHeader()
    });
    console.log(response.data)
    return response.data;
}

export async function getMachineConditions(): Promise<string[]> {
    const response = await axios.get<string[]>(`${BASE_URL}/machines/machineConditions`, {
        headers: getHeader()
    });
    return response.data;
}

/** Image-related endpoints */

export async function uploadMachineImages(machineId: string, formData: FormData) {
    const response = await axios.post(`${BASE_URL}/machines/${machineId}/images`, formData, {
        headers: {
            ...getHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export async function getMachineImages(machineId: string) {
    const response = await axios.get(`${BASE_URL}/machines/${machineId}/images`);
    return response.data;
}

export async function getMachineImage(machineId: string, imageId: string) {
    const response = await axios.get(`${BASE_URL}/machines/${machineId}/images/${imageId}`);
    return response.data;
}

export async function deleteMachineImage(machineId: string, imageId: string) {
    const response = await axios.delete(`${BASE_URL}/machines/${machineId}/images/${imageId}`);
    return response.data;
}

export async function setIsPrimaryImage(machineId: string, imageId: string) {
    const response = await axios.put(`${BASE_URL}/machines/${machineId}/images/${imageId}/primary`,
        { headers: getHeader() }
    );
    return response.data;

}


/** booking endpoints */

export async function getAllBookings() {

    const response = await axios.get(`${BASE_URL}/bookings`,
        { headers: getHeader() }
    );
    return response.data;
}


export async function createBooking(bookingRequest: BookingRequest) {
    try {
        const response = await axios.post(`${BASE_URL}/bookings`, bookingRequest, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Booking failed. Please try again.");
        }
        throw new Error("Network error. Please check your connection.");
    }
}

export async function getBookingsByUser(userId: string): Promise<BookingListResponse[]> {
    const response = await axios.get<BookingListResponse[]>(`${BASE_URL}/bookings/user/${userId}`, {
        headers: getHeader()
    });
    return response.data;

}
export async function getBookingsForOwner(ownerId: string) {
    const response = await axios.get(`${BASE_URL}/bookings/owner/${ownerId}`,
        { headers: getHeader() })

    return response.data;
}

export async function getBooking(id: string) {

    const response = await axios.get(`${BASE_URL}/bookings/${id}`,
        { headers: getHeader() })

    return response.data;
}

export async function getBookingByStatus(userId: string, status: string) {
    const response = await axios.get(`${BASE_URL}/bookings/user/${userId}/status?status=${status}`,
        { headers: getHeader() })
    return response.data;
}

export async function updateBooking(id: string, bookingRequest: BookingRequest) {
    const response = await axios.put(`${BASE_URL}/bookings/${id}`, bookingRequest,
        { headers: getHeader() })
    return response.data;
}

export async function deleteBooking(id: string) {
    const response = await axios.delete(`${BASE_URL}/bookings/${id}`,
        { headers: getHeader() })
    return response.data;
}

export async function updateStatus(id: string, status: string) {
    const response = await axios.put(`${BASE_URL}/bookings/${id}/status-update?status=${status}`, {},
        { headers: getHeader() })
    return response.data;
}

export async function getBookingCode(code: string) {
    const response = await axios.get(`${BASE_URL}/bookings/get-by-code?code=${code}`,
        { headers: getHeader() })
    return response.data;

}

export async function getBookingStatusList(): Promise<string[]> {
    const response = await axios.get<string[]>(`${BASE_URL}/bookings/booking-status-list`,
        { headers: getHeader() });
    return response.data;

}

export async function getBookingsByMachine(machineId: string): Promise<BookingListResponse[]> {

    const response = await axios.get<BookingListResponse[]>(`${BASE_URL}/bookings/machine/${machineId}`,
        { headers: getHeader() });

    return response.data;
}

/** Reviews endpoints */
export async function getReviewsForMachine(machineId: string) {
    const response = await axios.get(`${BASE_URL}/reviews/machine/${machineId}`)
    return response.data
}

export async function createReview(bookingId: string, reviewRequest: ReviewRequest) {
    const response = await axios.post(`${BASE_URL}/bookings/${bookingId}/reviews`, reviewRequest,
        { headers: getHeader() })
    return response.data;
}

export async function getReviewById(id: string) {
    const response = await axios.get(`${BASE_URL}/reviews/${id}`)
    return response.data
}

export async function updateReview(id: string, reviewRequest: ReviewRequest) {
    const response = await axios.put(`${BASE_URL}/reviews/${id}`, reviewRequest,
        { headers: getHeader() })

    return response.data
}

export async function deleteReview(id: string) {
    const response = await axios.delete(`${BASE_URL}/reviews/${id}`,
        { headers: getHeader() })
    return response.data
}

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
