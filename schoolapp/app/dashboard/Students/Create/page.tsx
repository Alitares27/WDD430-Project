'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function AddStudentPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [dateofbirth, setDateofbirth] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [enrollmentdate, setEnrollmentdate] = useState<string>('');
  const [parentscontact, setParentscontact] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [avatarurll, setAvatarurll] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSaving(true);
      const newStudentData = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        grade,
        dateofbirth: dateofbirth || null,
        address: address || null,
        phonenumber: phonenumber || null,
        enrollmentdate: enrollmentdate || null,
        parentscontact: parentscontact || null,
        notes: notes || null,
        avatarurll: avatarurll || null,
      };

      try {
        
        const res = await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newStudentData),
        });

        if (!res.ok) throw new Error('Failed to add student.');

        router.push('/dashboard/Students');
      } catch (_err) {
        alert('Error adding student.');
      } finally {
        setSaving(false);
      }
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
            id="dateofbirth"
            label="Date of Birth"
            type="date"
            value={dateofbirth}
            onChange={(e) => setDateofbirth(e.target.value)}
            error={errors.dateofbirth}
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
        />

        <Input
          id="phonenumber"
          label="Phone Number"
          type="tel"
          placeholder="e.g., +1 (555) 123-4567"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          error={errors.phonenumber}
        />

        <Input
          id="enrollmentdate"
          label="Enrollment Date"
          type="date"
          value={enrollmentdate}
          onChange={(e) => setEnrollmentdate(e.target.value)}
          error={errors.enrollmentdate}
        />

        <Input
          id="parentscontact"
          label="Parents Contact"
          type="text"
          placeholder="Parent's contact info"
          value={parentscontact}
          onChange={(e) => setParentscontact(e.target.value)}
          error={errors.parentscontact}
        />

        <Input
          id="notes"
          label="Notes"
          type="text"
          placeholder="Additional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          error={errors.notes}
        />

        <Input
          id="avatarurll"
          label="Avatar URL"
          type="text"
          placeholder=""
          value={avatarurll}
          onChange={(e) => setAvatarurll(e.target.value)}
          error={errors.avatarurll}
        />

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
            {saving ? 'Saving...' : 'Add Student'}
          </Button>
        </div>
      </form>
    </div>
  );
}