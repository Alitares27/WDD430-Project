'use client'; 

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import { useParams, useRouter } from 'next/navigation'; 
import { getSession } from 'next-auth/react';

interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  phonenumber?: string | null;
  address?: string | null;
  hiredate?: string | null;
  qualification?: string | null;
  bio?: string | null;
  avatarurl?: string | null;
}

export default function EditTeacherPage() {
  const router = useRouter();
  const params = useParams();
  const teacherId = params.id as string;

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [hiredate, setHiredate] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatarurl, setAvatarurl] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionAndData = async () => {
      setLoading(true);
      setFetchError(null);

      const session = await getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      setUserRole(session.user?.role ?? null);

      if (session.user?.role === 'teacher' && session.user.id !== teacherId) {
        setFetchError('No tienes permiso para editar este perfil.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/teachers/${teacherId}`);
        if (!res.ok) throw new Error('Teacher not found.');
        const data: Teacher = await res.json();

        setFirstname(data.firstname || '');
        setLastname(data.lastname || '');
        setEmail(data.email || '');
        setSubject(data.subject || '');
        setPhonenumber(data.phonenumber || '');
        setAddress(data.address || '');
        setHiredate(data.hiredate || '');
        setQualification(data.qualification || '');
        setBio(data.bio || '');
        setAvatarurl(data.avatarurl || '');
      } catch (err: unknown) {
        if (err instanceof Error) setFetchError(err.message);
        else setFetchError('Error loading teacher data.');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) fetchSessionAndData();
  }, [teacherId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormErrors: { [key: string]: string } = {};

    if (!firstname.trim()) newFormErrors.firstname = 'First Name is required.';
    if (!lastname.trim()) newFormErrors.lastname = 'Last Name is required.';
    if (!email.trim()) newFormErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newFormErrors.email = 'Email address is invalid.';
    if (!subject.trim()) newFormErrors.subject = 'Subject is required.';
    if (!phonenumber.trim()) newFormErrors.phonenumber = 'Phone Number is required.';

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length > 0) return;

    const updatedTeacherData: Partial<Teacher> = {
      firstname,
      lastname,
      email,
      subject,
      phonenumber,
      address,
      hiredate,
      qualification,
      bio,
      avatarurl,
    };

    try {
      setLoading(true);
      const res = await fetch(`/api/teachers/${teacherId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeacherData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error updating teacher.');
      }

      router.push(`/dashboard/Teachers/${teacherId}`);
    } catch (err: unknown) {
      if (err instanceof Error) setFetchError(err.message);
      else setFetchError('Error updating teacher.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Edit Teacher</h1>
        <p>Loading teacher data for editing...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>{fetchError}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Teacher</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstname"
            label="First Name"
            type="text"
            placeholder="Alice"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            error={formErrors.firstname}
            required
          />
          <Input
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Smith"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            error={formErrors.lastname}
            required
          />
        </div>

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="alice.smith@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
          required
          disabled={userRole === 'teacher'} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="subject"
            label="Subject"
            type="text"
            placeholder="e.g., Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={formErrors.subject}
            required
            disabled={userRole === 'teacher'} 
          />
          <Input
            id="phonenumber"
            label="Phone Number"
            type="tel"
            placeholder="e.g., +1 (555) 111-2222"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            error={formErrors.phonenumber}
            required
          />
        </div>

        <Input
          id="address"
          label="Address"
          type="text"
          placeholder="123 Main St, Anytown, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={formErrors.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="hiredate"
            label="Hire Date"
            type="date"
            value={hiredate}
            onChange={(e) => setHiredate(e.target.value)}
            error={formErrors.hiredate}
            disabled={userRole === 'teacher'} 
          />
          <Input
            id="qualification"
            label="Qualification"
            type="text"
            placeholder="e.g., Ph.D. in Physics"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            error={formErrors.qualification}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
            Biography / Notes
          </label>
          <textarea
            id="bio"
            rows={5}
            className={`
              shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline resize-y
              ${formErrors.bio ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="Enter any additional notes about the teacher..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          {formErrors.bio && <p className="text-red-500 text-xs italic mt-1">{formErrors.bio}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
