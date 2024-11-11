'use client'
import { UserDetails } from "@/app/lib/definitions";
import { getLoggedUserProfile } from "@/app/lib/service";
import { useEffect, useState } from "react";




export default function Profile() {
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [error, setError] = useState<string | null>(null);

    async function getUserDetails() {
        try {
            const response = await getLoggedUserProfile()
            setUserDetails(response)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load machine');
        }
    }
    useEffect(() => {
        getUserDetails()
    }, []);
    return (
        <>
            <div>
            {error && <p>Error: {error}</p>}
            {userDetails ? (
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p>Full Name: {userDetails.fullName}</p>
                    <p>Phone: {userDetails.phone}</p>
                    <p>Role: {userDetails.role}</p>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
        </>
    )
}