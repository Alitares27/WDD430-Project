'use client'; 

import React, { useState } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import { useRouter } from 'next/navigation'; 

export default function AddStudentPage() {
  const router = useRouter(); 

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

 
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
    if (!grade.trim()) newErrors.grade = 'Grade is required.';
    if (!dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!address.trim()) newErrors.address = 'Address is required.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required.';


    setErrors(newErrors); 

    if (Object.keys(newErrors).length === 0) {
      const newStudentData = {
        firstName,
        lastName,
        email,
        grade,
        dateOfBirth,
        address,
        phoneNumber,
        
      };
      console.log(newStudentData);

      alert('Student added successfully (simulated)!');
      router.push('/dashboard/Students'); 
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Student</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
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
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="grade"
            label="Grade"
            type="text" 
            placeholder="e.g., 10th Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            error={errors.grade}
            required
          />
          <Input
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            error={errors.dateOfBirth}
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
          error={errors.address}
          required
        />

        <Input
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="e.g., +1 (555) 123-4567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={errors.phoneNumber}
          required
        />

        {}

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button" 
            variant="secondary"
            onClick={() => router.back()} 
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Student
          </Button>
        </div>
      </form>
    </div>
  );
}