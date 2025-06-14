'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/app/ui/button';

interface User {
    user_id: string;
    username: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    is_email_confirmed: boolean;
    last_login_at?: Date | null;
    created_at: Date;
    updated_at: Date;
}

export default function UserDetailPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`/api/users/${userId}`);
                if (!res.ok) {
                    throw new Error('User not found.');
                }
                const data = await res.json();
                setUser(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error loading user details. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center text-gray-600">
                <h1 className="text-3xl font-bold mb-4">User Details</h1>
                <p>Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center text-red-600">
                <h1 className="text-3xl font-bold mb-4">Error</h1>
                <p>{error}</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto p-4 text-center text-gray-600">
                <h1 className="text-3xl font-bold mb-4">User Details</h1>
                <p>No user data available.</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Details</h1>

            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                    <div className="flex-grow text-center md:text-left">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{user.first_name} {user.last_name}</h2>
                        <p className="text-xl font-bold text-cyan-800 mb-4">{user.role}</p>
                        <p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
                        <p className="text-gray-700 mb-1"><strong>Username:</strong> {user.username}</p>
                        <p className="text-gray-700 mb-1"><strong>First Name:</strong> {user.first_name}</p>
                        <p className="text-gray-700 mb-1"><strong>Last Name:</strong> {user.last_name}</p>
                        <p className="text-gray-700 mb-1"><strong>Active:</strong> {user.is_active ? 'Yes' : 'No'}</p>
                        <p className="text-gray-700 mb-1"><strong>Email Confirmed:</strong> {user.is_email_confirmed ? 'Yes' : 'No'}</p>
                        <p className="text-gray-700 mb-1"><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
                        <p className="text-gray-700 mb-1"><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
                        
                        {user.last_login_at && (
                            <p className="text-gray-700 mb-1"><strong>Last Login:</strong> {new Date(user.last_login_at).toLocaleString()}</p>
                        )}
                        
                    </div>
                </div>

            </div>

            <div className="flex justify-between md:justify-end gap-4 mt-6">
                <Button variant="secondary" onClick={() => router.back()}>
                    Go Back
                </Button>
                <Button variant="primary" onClick={() => router.push(`/dashboard/Users/${user.user_id}/edit`)}>
                    Edit
                </Button>
                <Button
                    variant="danger"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={async () => {
                        if (confirm(`Are you sure you want to delete ${user.first_name}?`)) {
                            const res = await fetch(`/api/users/${user.user_id}`, { method: 'DELETE' });

                            if (res.ok) {
                                alert('User deleted successfully.');
                                router.push('/dashboard/Users');
                            } else {
                                const errorData = await res.json();
                                alert(`Error: ${errorData.error}`);
                            }
                        }
                    }}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}
