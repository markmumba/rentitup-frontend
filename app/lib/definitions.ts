export interface RegisterRequest {
        email: string;
        password: string;
        fullName: string;
        phone: string;
        role: string;
}

export interface LoginRequest {
        email: string;
        password: string;
}

export interface CategoryRequest {
        name: string;
        description: string;
        priceCalculationType: string;
}

export interface MachineRequest {
        name: string;
        description: string;
        basePrice: string;
        condition: string;
        specification: string;
        categoryId: string;
        ownerId: string;
}

export interface BookingRequest {
        machineId: string;
        startDate?: string;
        endDate?: string;
        pickUpLocation?: string;
        totalAmount?: string;
        customerId?: string;
}


export interface ReviewRequest {
        machineRating: number;
        comment: string;
        reviewerId: string;
}

export interface CategoryListResponse {
        id: string;
        name: string;
        description: string;
}

export interface CategoryResponse {
        id: string;
        name: string;
        description: string;
        priceCalculationType: string;
        machines: MachineListResponse[];
}

export interface MachineListResponse {
        id: string;
        name: string;
        basePrice: string;
        isAvailable: boolean;
        machineImageUrl: string;
        description: string;
        condition: string;
        categoryId: string;
}

export interface MachineImageResponse {
        id: number;
        url: string;
        isPrimary: boolean;
}

export interface OwnerResponse {
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: string;
        verifiedAt: string | null;
}

export interface MachineResponse {
        id: number;
        name: string;
        description: string;
        basePrice: string;
        condition: string;
        specification: string;
        isAvailable: boolean;
        owner: OwnerResponse;
        categoryId: number;
        machineImages: MachineImageResponse[];
}


export interface UserDetails {
        id: string;
        avatarUrl: string;
        email: string;
        fullName: string;
        phone: string;
        role: string;
        ownedMachines: Array<{
            id: string;
            name: string;
            description: string;
            basePrice: string;
            condition: string;
            specification: string;
            isAvailable: boolean;
            machineImages: Array<{
                id: string;
                url: string;
                isPrimary: boolean;
            }>;
        }>;
    }
export interface BookingListResponse {
        id: string;
        bookingCode: string;
        startDate: string;
        endDate: string;
        status: string;
        totalAmount: string;
}



export interface BookingUserResponse {
        id: number;
        name: string;
        email: string;
        role: string;
}

export interface BookingMachineResponse {
        id: number;
        name: string;
        imageUrl:string;
        specification: string;
        owner: BookingUserResponse;
}

export interface BookingResponse {
        id: number;
        bookingCode: string;
        startDate: string;
        endDate: string;
        pickUpLocation: string;
        status: string;
        totalAmount: number;
        machine: BookingMachineResponse;
        customer: BookingUserResponse;
}

export enum BookingStatus {
        PENDING = 'PENDING',
        CONFIRMED = 'CONFIRMED',
        CANCELLED = 'CANCELLED',
        COMPLETED = 'COMPLETED'
}
