

interface registerRequest {
        email: string;
        password: string;
        fullName: string;
        phone: string;
        role: string;
}

interface loginRequest {
        email: string;
        password: string;
}

interface categoryRequest {
        name: string;
        description: string;
        priceCalculationType: string;
}


interface machineRequest {
        name: string,
        description :string,
        basePrice : string,
        condition :string,
        specification:string,
        categoryId:string,
        ownerId:string
}

interface bookingRequest {
        startDate : string;
        endDate :string;
        pickUpLocation: string;
        totalAmount: string;
        machineId:string;
        customerId:string;
}

interface reviewRequest {
        machineRating: number;
        comment :string;
        reviewerId:string;
}