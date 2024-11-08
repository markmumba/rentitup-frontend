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
        startDate: string;
        endDate: string;
        pickUpLocation: string;
        totalAmount: string;
        machineId: string;
        customerId: string;
}

export interface ReviewRequest {
        machineRating: number;
        comment: string;
        reviewerId: string;
}

export interface CategoryListResponse {
        id: string;
        name:string;
        description:string;
}



