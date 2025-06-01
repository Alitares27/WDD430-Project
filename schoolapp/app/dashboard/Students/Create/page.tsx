'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { createStudent } from '@/app/lib/actions';

export default function AddStudentPage() {
  const router = useRouter();

  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [dateofbirth, setDateofbirth] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [enrollmentdate, setEnrollmentdate] = useState<string>('');
  const [parentscontact, setParentscontact] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [avatarurl, setAvatarurl] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setErrors({});

    const studentData = {
      firstname,
      lastname,
      email,
      grade,
      dateofbirth: dateofbirth || null,
      address: address || null,
      phonenumber: phonenumber || null,
      enrollmentdate: enrollmentdate || null,
      parentscontact: parentscontact || null,
      notes: notes || null,
      avatarurl: avatarurl || null,
    };

    const result = await createStudent(studentData);

    if (result.errors) {
      setErrors(result.errors);
      setSaving(false);
      return;
    }

    router.push('/dashboard/Students');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Student</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstname"
            label="First Name"
            type="text"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstname?.join(', ')}
            required
          />
          <Input
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastname?.join(', ')}
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
          error={errors.email?.join(', ')}
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
            error={errors.grade?.join(', ')}
            required
          />
          <Input
            id="dateofbirth"
            label="Date of Birth"
            type="date"
            value={dateofbirth}
            onChange={(e) => setDateofbirth(e.target.value)}
            error={errors.dateofbirth?.join(', ')}
          />
        </div>

        <Input
          id="address"
          label="Address"
          type="text"
          placeholder="123 Main St, Anytown, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={errors.address?.join(', ')}
        />

        <Input
          id="phonenumber"
          label="Phone Number"
          type="tel"
          placeholder="e.g., +1 (555) 123-4567"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          error={errors.phonenumber?.join(', ')}
        />

        <Input
          id="enrollmentdate"
          label="Enrollment Date"
          type="date"
          value={enrollmentdate}
          onChange={(e) => setEnrollmentdate(e.target.value)}
          error={errors.enrollmentdate?.join(', ')}
        />

        <Input
          id="parentscontact"
          label="Parents Contact"
          type="text"
          placeholder="Parent's contact info"
          value={parentscontact}
          onChange={(e) => setParentscontact(e.target.value)}
          error={errors.parentscontact?.join(', ')}
        />

        <Input
          id="notes"
          label="Notes"
          type="text"
          placeholder="Additional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          error={errors.notes?.join(', ')}
        />

        <Input
          id="avatarurl"
          label="Avatar URL"
          type="text"
          placeholder=""
          value={avatarurl}
          onChange={(e) => setAvatarurl(e.target.value)}
          error={errors.avatarurl?.join(', ')}
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