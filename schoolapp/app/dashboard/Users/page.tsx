'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import UserCard from '../../ui/users/UserCard';
import { useRouter } from 'next/navigation';
import { Users } from '@/app/lib/definitions';

export default function UsersPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<Users[]>([]);
    const [selectedRole, setSelectedRole] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) throw new Error('Failed to fetch users');
                const data = await res.json();
                setUsers(data);
            } catch {
                setUsers([]);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
  const matchesSearch =
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesRole = selectedRole ? user.role === selectedRole : true;

  return matchesSearch && matchesRole;
});




    const handleViewDetails = (id: string) => {
        router.push(`/dashboard/Users/${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/dashboard/users/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(`Are you sure you want to delete the user?`)) {
            try {
                await fetch(`/api/users/${id}`, { method: 'DELETE' });
                setUsers(prevUsers => prevUsers.filter(user => user.user_id !== id));
            } catch {
                alert('Failed to delete user.');
            }
        }
    };

    const handleAddNewUser = () => {
        router.push('/dashboard/Users/Create');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                    <Input
                        id="search-users"
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:max-w-xs"
                    />

                    <div className="flex items-center gap-2">
                        <label htmlFor="role-filter" className="font-medium text-gray-700">
                            Filter by Role:
                        </label>
                        <select
                            id="role-filter"
                            className="border rounded px-3 py-2"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            {[...new Set(users.map(u => u.role).filter(Boolean))].map(role => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        className="whitespace-nowrap"
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedRole('');
                        }}
                    >
                        Reset Filters
                    </Button>
                </div>

                <Button onClick={handleAddNewUser} className="w-full md:w-auto">
                    Add User
                </Button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserCard
                            key={user.user_id}
                            user={{
                                ...user,
                                first_name: user.first_name,
                                last_name: user.last_name

                            }}
                            onViewDetails={handleViewDetails}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600 mt-8">
                        No users found matching your search.
                    </p>
                )}
            </div>
        </div>
    );
}
