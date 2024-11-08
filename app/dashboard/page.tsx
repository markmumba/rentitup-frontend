
'use client';
import { useEffect, useState } from "react";
import { getLoggedUserProfile } from "../lib/service"
import { UserDetails } from "../lib/definitions";


export default function Dashboard() {

    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [error, setError] = useState<string | null>(null);

    async function getUserDetails() {
        try {
            const response = await getLoggedUserProfile()
            console.log(response)
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