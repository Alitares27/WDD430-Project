'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import { useRouter } from 'next/navigation'; 

export default function AddNewTeacherPage() {
  const router = useRouter(); 
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [hireDate, setHireDate] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    const newErrors: { [key: string]: string } = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required.';
    

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newTeacherData = {
        id: `t${Date.now()}`, 
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
      
      alert('Teacher added successfully (simulated)!');
      router.push('/dashboard/Teachers'); 
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Teacher</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="Jane"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
            required
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="subject"
            label="Subject"
            type="text"
            placeholder="e.g., Biology"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={errors.subject}
            required
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="e.g., +1 (555) 987-6543"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={errors.phoneNumber}
            required
          />
        </div>

        <Input
          id="address"
          label="Address"
          type="text"
          placeholder="456 Elm St, Anytown, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="hireDate"
            label="Hire Date"
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            error={errors.hireDate}
          />
          <Input
            id="qualification"
            label="Qualification"
            type="text"
            placeholder="e.g., M.Sc. in Biology"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            error={errors.qualification}
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
              ${errors.bio ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="Enter any additional notes about the teacher..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-xs italic mt-1">{errors.bio}</p>
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
            Add Teacher
          </Button>
        </div>
      </form>
    </div>
  );
}