'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useParams, useRouter } from 'next/navigation';

interface Student {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  grade: string;
  dateofbirth?: string | null;
  address?: string | null;
  phonenumber?: string | null;
  avatarurl?: string | null;
  enrollmentdate?: string | null;
  parentscontact?: string | null;
  notes?: string | null;
}

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [dateofbirth, setDateofbirth] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [enrollmentdate, setEnrollmentdate] = useState<string>('');
  const [parentscontact, setParentscontact] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(`/api/students/${studentId}`);
        if (!res.ok) throw new Error('Student not found.');
        const data: Student = await res.json();

        setFirstname(data.firstname || '');
        setLastname(data.lastname || '');
        setEmail(data.email || '');
        setGrade(data.grade || '');
        setDateofbirth(data.dateofbirth || '');
        setAddress(data.address || '');
        setPhonenumber(data.phonenumber || '');
        setEnrollmentdate(data.enrollmentdate || '');
        setParentscontact(data.parentscontact || '');
        setNotes(data.notes || '');
      } catch (err) {
        setFetchError('Error loading student data for editing.');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormErrors: { [key: string]: string } = {};

    if (!firstname.trim()) newFormErrors.firstname = 'First Name is required.';
    if (!lastname.trim()) newFormErrors.lastname = 'Last Name is required.';
    if (!email.trim()) {
      newFormErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFormErrors.email = 'Email address is invalid.';
    }
    if (!grade.trim()) newFormErrors.grade = 'Grade is required.';
    if (!dateofbirth.trim()) newFormErrors.dateofbirth = 'Date of Birth is required.';
    if (!address.trim()) newFormErrors.address = 'Address is required.';
    if (!phonenumber.trim()) newFormErrors.phonenumber = 'Phone Number is required.';

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      setSaving(true);
      try {
        const updatedStudentData: Partial<Student> = {
          firstname,lastname,email,grade,dateofbirth,address,phonenumber,enrollmentdate,parentscontact,notes,
        };

        const res = await fetch(`/api/students/${studentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedStudentData),
        });

        if (!res.ok) {
          throw new Error('Failed to update student.');
        }

        alert('Student updated successfully!');
        router.push(`/dashboard/Students/${studentId}`);
      } catch (err) {
        setFetchError('Error updating student. Please try again.');
      } finally {
        setSaving(false);
      }
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
            id="firstname"
            label="First Name"
            type="text"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            error={formErrors.firstname}
            required
          />
          <Input
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Doe"
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
            id="dateofbirth"
            label="Date of Birth"
            type="date"
            value={dateofbirth}
            onChange={(e) => setDateofbirth(e.target.value)}
            error={formErrors.dateofbirth}
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
          id="phonenumber"
          label="Phone Number"
          type="tel"
          placeholder="e.g., +1 (555) 123-4567"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          error={formErrors.phonenumber}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="enrollmentdate"
            label="Enrollment Date"
            type="date"
            value={enrollmentdate || ''}
            onChange={(e) => setEnrollmentdate(e.target.value)}
            error={formErrors.enrollmentdate}
          />
          <Input
            id="parentscontact"
            label="Parents/Guardians Contact"
            type="text"
            placeholder="e.g., Jane Doe: +1 (555) 987-6543"
            value={parentscontact || ''}
            onChange={(e) => setParentscontact(e.target.value)}
            error={formErrors.parentscontact}
          />
        </div>

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
            value={notes || ''}
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
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
