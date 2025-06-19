'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { getSession } from 'next-auth/react';

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export default function UserEditPage() {
  const router = useRouter();
  const params = useParams();
  const userIdFromUrl = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [sessionUser, setSessionUser] = useState<{ id: string; role: string } | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [role, setRole] = useState('student'); 

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchSessionAndUser = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (!session) {
          router.push('/login');
          return;
        }
        const currentUserId = session.user?.id;
        const currentUserRole = session.user?.role;

        setSessionUser({ id: currentUserId!, role: currentUserRole! });

        if (currentUserRole !== 'admin' && userIdFromUrl !== currentUserId) {
          alert('You are not authorized to edit this profile.');
          router.push('/dashboard/Users');
          return;
        }

        const res = await fetch(`/api/users/${userIdFromUrl}`);
        if (!res.ok) throw new Error('Failed to fetch user data.');
        const userData = await res.json();
        setUser(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setRole(userData.role);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessionAndUser();
  }, [router, userIdFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const body: any = {
        first_name: firstName,
        last_name: lastName,
        email,
      };

      if (sessionUser?.role === 'admin') {
        body.role = role;
      }

      if (password.trim()) {
        body.password = password;
      }

      const res = await fetch(`/api/users/${userIdFromUrl}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update user.');
      }

      alert('User updated successfully.');
      router.push('/dashboard/Users');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading user data...</p>;
  }

  if (!user) {
    return <p className="text-center mt-20 text-red-600">User not found.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Edit User Profile</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="firstName"
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <Input
          id="lastName"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="password"
          label="New Password (leave blank to keep current)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        

        {sessionUser?.role === 'admin' && (
          <div>
            <label htmlFor="role" className="block font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              className="w-full border rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            type="button"
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
