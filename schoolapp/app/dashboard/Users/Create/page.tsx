'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';

export default function AddNewUserPage() {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password_hash, setPasswordHash] = useState<string>('');
    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const newUserData = {
            username,
            email,
            password_hash,
            first_name,
            last_name,
            role,
        };

        try {
            const res = await fetch('/api/users/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData),
            });

            const contentType = res.headers.get('content-type');
            const data = contentType?.includes('application/json') ? await res.json() : null;

            if (!res.ok) {
                console.error('Server returned error:', data);
                if (data?.errors) setErrors(data.errors);
                else alert('Error creating user');
            } else {
                alert('User added successfully!');
                router.push('/dashboard/Users');
            }
        } catch (err) {
            console.error('Error adding user:', err);
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add User</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                        id="username"
                        label="Username"
                        type="text"
                        placeholder="Jane_d"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={errors.username}
                        required
                    />

                    <Input
                        id="first_name"
                        label="First Name"
                        type="text"
                        placeholder="Jane"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={errors.first_name}
                        required
                    />
                    <Input
                        id="lastname"
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        error={errors.lastname}
                        required
                    />


                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="jane.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        required
                    />

                    <Input
                        id="password_hash"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        value={password_hash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        error={errors.password_hash}
                        required
                    />


                    <Input
                        id="role"
                        label="Role"
                        type="text"
                        placeholder="e.g., Admin, Teacher, Student"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        error={errors.role}
                        required
                    />
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.back()}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Adding...' : 'Add User'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
