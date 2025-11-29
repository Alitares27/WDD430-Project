'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import type { Student } from '@/app/lib/definitions';

export default function StudentEditPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [enrollmentdate, setEnrollmentDate] = useState('');
  const [parentscontact, setParentsContact] = useState('');
  const [notes, setNotes] = useState('');
  const [avatarurl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/students/${studentId}`);
        if (!res.ok) throw new Error('Failed to fetch student');

        const responseData = await res.json();
        const data: Student = Array.isArray(responseData) ? responseData[0] : responseData;

        setStudent(data);

        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setGrade(data.grade);
        setDateOfBirth(data.dateofbirth ?? '');
        setAddress(data.address ?? '');
        setPhoneNumber(data.phonenumber ?? '');
        setEnrollmentDate(data.enrollmentdate ?? '');
        setParentsContact(data.parentscontact ?? '');
        setNotes(data.notes ?? '');
        setAvatarUrl(data.avatarurl ?? '');
      } catch {
        setError('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update student');
      }

      alert('Student updated successfully');
      router.push('/dashboard/Students');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading student data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="firstname" label="First Name" value={firstname} onChange={e => setFirstName(e.target.value)} required />
        <Input id="lastname" label="Last Name" value={lastname} onChange={e => setLastName(e.target.value)} required />
        <Input id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input id="grade" label="Grade" value={grade} onChange={e => setGrade(e.target.value)} required />
        <Input id="dateofbirth" label="Date of Birth" type="date" value={dateofbirth} onChange={e => setDateOfBirth(e.target.value)} />
        <Input id="address" label="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <Input id="phonenumber" label="Phone Number" value={phonenumber} onChange={e => setPhoneNumber(e.target.value)} />
        <Input id="enrollmentdate" label="Enrollment Date" type="date" value={enrollmentdate} onChange={e => setEnrollmentDate(e.target.value)} />
        <Input id="parentscontact" label="Parents Contact" value={parentscontact} onChange={e => setParentsContact(e.target.value)} />
        <Input id="notes" label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <Input id="avatarurl" label="Avatar URL" value={avatarurl} onChange={e => setAvatarUrl(e.target.value)} />

        <div className="flex justify-end gap-4 mt-6">
          <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
          <Button variant="secondary" onClick={() => router.back()} type="button" disabled={saving}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
