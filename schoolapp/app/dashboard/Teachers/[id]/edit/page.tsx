'use client'; 

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import { useParams, useRouter } from 'next/navigation'; 

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  phoneNumber: string;
  address?: string;
  hireDate?: string;
  qualification?: string;
  bio?: string;
  avatarUrl?: string;
}

const DUMMY_TEACHERS_DATA: Teacher[] = [
  {
    id: 't001',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    subject: 'Mathematics',
    phoneNumber: '+1 (555) 111-2222',
    address: '123 Math Lane, Educaville, USA',
    hireDate: '2018-08-15',
    qualification: 'Ph.D. in Mathematics',
    bio: 'Experienced math teacher with a passion for problem-solving. Enjoys integrating real-world applications into lessons.',
    avatarUrl: 'https://via.placeholder.com/200/007BFF/FFFFFF?text=AS',
  },
  {
    id: 't002',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    subject: 'Physics',
    phoneNumber: '+1 (555) 333-4444',
    address: '456 Quantum Blvd, Science City, USA',
    hireDate: '2020-09-01',
    qualification: 'M.Sc. in Physics Education',
    bio: 'Dedicated physics educator who believes in hands-on learning. Leads the school robotics club.',
  },
  {
    id: 't003',
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.w@example.com',
    subject: 'Literature',
    phoneNumber: '+1 (555) 555-6666',
    address: '789 Storybook Rd, Booktown, USA',
    hireDate: '2019-01-20',
    qualification: 'B.A. in English Literature',
    bio: 'Passionate about classic literature and creative writing. Organizes the school\'s annual poetry slam.',
    avatarUrl: 'https://via.placeholder.com/200/FFC107/000000?text=CW',
  },
];

export default function EditTeacherPage() {
  const router = useRouter();
  const params = useParams();
  const teacherId = params.id as string; 

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [hireDate, setHireDate] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true);
      setFetchError(null);
      try {

        const data = DUMMY_TEACHERS_DATA.find(t => t.id === teacherId);

        if (data) {
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
          setSubject(data.subject || '');
          setPhoneNumber(data.phoneNumber || '');
          setAddress(data.address || '');
          setHireDate(data.hireDate || '');
          setQualification(data.qualification || '');
          setBio(data.bio || '');
        } else {
          setFetchError('Teacher not found.');
        }
      } catch (err) {
        console.error("Error fetching teacher data:", err);
        setFetchError('Error loading teacher data for editing.');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacherData();
    }
  }, [teacherId]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFormErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newFormErrors.firstName = 'First Name is required.';
    if (!lastName.trim()) newFormErrors.lastName = 'Last Name is required.';
    if (!email.trim()) {
      newFormErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFormErrors.email = 'Email address is invalid.';
    }
    if (!subject.trim()) newFormErrors.subject = 'Subject is required.';
    if (!phoneNumber.trim()) newFormErrors.phoneNumber = 'Phone Number is required.';

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      const updatedTeacherData: Partial<Teacher> = { 
        id: teacherId, 
        firstName,
        lastName,
        email,
        subject,
        phoneNumber,
        address,
        hireDate,
        qualification,
        bio,
      };

      console.log('Updating teacher data:', updatedTeacherData);

      
      alert('Teacher updated successfully (simulated)!');
      router.push(`/dashboard/Teachers/${teacherId}`); 
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
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Teacher</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="Alice"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={formErrors.firstName}
            required
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={formErrors.lastName}
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
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="e.g., +1 (555) 111-2222"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={formErrors.phoneNumber}
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
            id="hireDate"
            label="Hire Date"
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            error={formErrors.hireDate}
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

        {}
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
          {formErrors.bio && (
            <p className="text-red-500 text-xs italic mt-1">{formErrors.bio}</p>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()} 
          >
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