'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import { useRouter } from 'next/navigation'; 

export default function AddNewTeacherPage() {
  const router = useRouter(); 
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const newErrors: { [key: string]: string } = {};
    if (!firstname.trim()) newErrors.firstname = 'First Name is required.';
    if (!lastname.trim()) newErrors.lastname = 'Last Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!phonenumber.trim()) newErrors.phonenumber = 'Phone Number is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const newTeacherData = {
        id: `t${Date.now()}`,
        firstname,
        lastname,
        email,
        subject,
        phonenumber,
        address: address || null,
        hiredate: hiredate || null,
        qualification: qualification || null,
        bio: bio || null,
        avatarurl: avatarurl || null,
      };
      try {
        const res = await fetch('/api/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTeacherData),
        });
        if (!res.ok) throw new Error('Failed to add teacher');
        alert('Teacher added successfully!');
        router.push('/dashboard/Teachers');
      } catch (err) {
        alert('Error adding teacher. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Teacher</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="firstname"
            label="First Name"
            type="text"
            placeholder="Jane"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            error={errors.firstname}
            required
          />
          <Input
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            error={errors.lastname}
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
            id="phonenumber"
            label="Phone Number"
            type="tel"
            placeholder="e.g., +1 (555) 987-6543"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            error={errors.phonenumber}
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
            id="hiredate"
            label="Hire Date"
            type="date"
            value={hiredate}
            onChange={(e) => setHiredate(e.target.value)}
            error={errors.hiredate}
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

        <Input
          id="avatarurl"
          label="Avatar URL"
          type="text"
          placeholder="https://example.com/avatar.jpg"
          value={avatarurl}
          onChange={(e) => setAvatarurl(e.target.value)}
          error={errors.avatarurl}
        />

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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Teacher'}
          </Button>
        </div>
      </form>
    </div>
  );
}