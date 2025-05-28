'use client'; 

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import { useParams, useRouter } from 'next/navigation'; 

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  avatarUrl?: string;
  enrollmentDate?: string;
  parentsContact?: string;
  notes?: string;
}

const DUMMY_STUDENTS_DATA: Student[] = [
  {
    id: 's001',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    grade: '10th Grade',
    dateOfBirth: '2008-03-15',
    address: '123 Main St, Springfield, USA',
    phoneNumber: '+1 (555) 123-4567',
    avatarUrl: 'https://via.placeholder.com/200/FF5733/FFFFFF?text=JP',
    enrollmentDate: '2022-09-01',
    parentsContact: 'Maria Pérez: +1 (555) 987-6543',
    notes: 'Excellent student, strong in mathematics.',
  },
  {
    id: 's002',
    firstName: 'Ana',
    lastName: 'Gómez',
    email: 'ana.gomez@example.com',
    grade: '9th Grade',
    dateOfBirth: '2009-07-22',
    address: '456 Oak Ave, Shelbyville, USA',
    phoneNumber: '+1 (555) 234-5678',
    avatarUrl: 'https://via.placeholder.com/200/33FF57/FFFFFF?text=AG',
    enrollmentDate: '2023-09-01',
    parentsContact: 'Carlos Gómez: +1 (555) 876-5432',
    notes: 'Actively participates in school clubs.',
  },
  {
    id: 's003',
    firstName: 'Carlos',
    lastName: 'Díaz',
    email: 'carlos.diaz@example.com',
    grade: '10th Grade',
    dateOfBirth: '2008-11-01',
    address: '789 Pine Ln, Capital City, USA',
    phoneNumber: '+1 (555) 345-6789',
    avatarUrl: 'https://via.placeholder.com/200/3357FF/FFFFFF?text=CD',
    enrollmentDate: '2022-09-01',
    parentsContact: 'Luisa Díaz: +1 (555) 765-4321',
    notes: 'Needs to improve attendance.',
  },
];

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string; 

  
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [enrollmentDate, setEnrollmentDate] = useState<string>('');
  const [parentsContact, setParentsContact] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const data = DUMMY_STUDENTS_DATA.find(s => s.id === studentId);

        if (data) {
          
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
          setGrade(data.grade || '');
          setDateOfBirth(data.dateOfBirth || '');
          setAddress(data.address || '');
          setPhoneNumber(data.phoneNumber || '');
          setEnrollmentDate(data.enrollmentDate || '');
          setParentsContact(data.parentsContact || '');
          setNotes(data.notes || '');
        } else {
          setFetchError('Student not found.');
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setFetchError('Error loading student data for editing.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]); 

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
    if (!grade.trim()) newFormErrors.grade = 'Grade is required.';
    if (!dateOfBirth.trim()) newFormErrors.dateOfBirth = 'Date of Birth is required.';
    if (!address.trim()) newFormErrors.address = 'Address is required.';
    if (!phoneNumber.trim()) newFormErrors.phoneNumber = 'Phone Number is required.';

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      const updatedStudentData: Partial<Student> = { 
        id: studentId, 
        firstName,
        lastName,
        email,
        grade,
        dateOfBirth,
        address,
        phoneNumber,
        enrollmentDate,
        parentsContact,
        notes,
      };

      console.log('Updating student data:', updatedStudentData);

      alert('Student updated successfully (simulated)!');
      router.push(`/dashboard/Students/${studentId}`); 
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Edit Student</h1>
        <p>Loading student data for editing...</p>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Student</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={formErrors.firstName}
            required
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
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
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={formErrors.email}
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
            error={formErrors.grade}
            required
          />
          <Input
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            error={formErrors.dateOfBirth}
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
          required
        />

        <Input
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="e.g., +1 (555) 123-4567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={formErrors.phoneNumber}
          required
        />
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              id="enrollmentDate"
              label="Enrollment Date"
              type="date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
              error={formErrors.enrollmentDate}
            />
            <Input
              id="parentsContact"
              label="Parents/Guardians Contact"
              type="text"
              placeholder="e.g., Jane Doe: +1 (555) 987-6543"
              value={parentsContact}
              onChange={(e) => setParentsContact(e.target.value)}
              error={formErrors.parentsContact}
            />
        </div>

        {}
        <div className="mb-4">
          <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            rows={5}
            className={`
              shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline resize-y
              ${formErrors.notes ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="Enter any additional notes about the student..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          {formErrors.notes && (
            <p className="text-red-500 text-xs italic mt-1">{formErrors.notes}</p>
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