import axios from "axios";
import { useAuthStore } from "./store";
import { BookingRequest, CategoryListResponse, CategoryRequest, CategoryResponse, LoginRequest, MachineRequest, MachineResponse, RegisterRequest, ReviewRequest, UserDetails } from "./definitions";
import { useRouter } from "next/navigation";

const BASE_URL = "http://localhost:8080/api/v1";

export function getHeader() {
    const token = useAuthStore.getState().token;
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
}

/** Authentication endpoints */

export async function registerUser(registerData: RegisterRequest) {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, registerData);
        return response.data;
    } catch (error) {
        console.error("Error during registration function", error);
    }
}

export async function loginUser(loginData: LoginRequest) {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // If the error response from the server has data, pass it along
            throw new Error(error.response.data?.message || "Login failed. Please try again.");
        }
        // Generic error if something unexpected happens
        throw new Error("An unexpected error occurred. Please try again later.");
    }
}

/** User-related endpoints */

export async function getAllUsers() {
    const response = await axios.get(`${BASE_URL}/users`, {
        headers: getHeader()
    });
    return response.data;
}

export async function getAllOwners() {
    const response = await axios.get(`${BASE_URL}/users/owners`, {
        headers: getHeader()
    });
    return response.data;
}

export async function getUserById(id: string) {
    const response = await axios.get(`${BASE_URL}/users/${id}`, {
        headers: getHeader()
    });
    return response.data;
}

export async function getLoggedUserProfile():Promise<UserDetails> {
    const response = await axios.get(`${BASE_URL}/users/user-profile`, {
        headers: getHeader()
    });
    return response.data;
}

export async function updateUser(id: string, registerData: RegisterRequest) {
    const response = await axios.put(`${BASE_URL}/users/${id}`, registerData, {
        headers: getHeader()
    });
    return response.data;
}

export async function deleteUser(id: string) {
    const response = await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: getHeader()
    });
    return response.data;
}

/** Category-related endpoints */

export async function createCategory(categoryRequest: CategoryRequest) {
    const response = await axios.post(`${BASE_URL}/categories`, categoryRequest, {
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

export async function createMachine(machineRequest: MachineRequest) {
    const response = await axios.post(`${BASE_URL}/machines`, machineRequest, {
        headers: getHeader()
    });
    return response.data;
}

export async function changeAvailability() {
    const response = await axios.post(`${BASE_URL}/machines/change-availability`, {
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

    const response = await axios.post(`${BASE_URL}/bookings`, bookingRequest,
        { headers: getHeader() })
    return response.data;
}

export async function getBookingsByUser(userId: string) {

    const response = await axios.get(`${BASE_URL}/bookings/users/${userId}`,
        { headers: getHeader() })
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
    const response = await axios.put(`${BASE_URL}/bookings/${id}/status-update?status=${status}`,
        { headers: getHeader() })
    return response.data;
}

export async function getBookingCode(code: string) {
    const response = await axios.get(`${BASE_URL}/bookings/get-by-code?code=${code}`,
        { headers: getHeader() })
    return response.data;

}

export async function getBookingStatusList() {
    const response = await axios.get(`${BASE_URL}/bookings/booking-status-list`,
        { headers: getHeader() })
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
