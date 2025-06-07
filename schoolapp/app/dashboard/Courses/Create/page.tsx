'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { createCourse } from '@/app/lib/actions';

export default function AddCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [courseCode, setCourseCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [credits, setCredits] = useState<number>(0);
  const [duration, setDuration] = useState<string>('');
  const [difficultyLevel, setDifficultyLevel] = useState<string>('Beginner');
  const [teacher_email, setTeacherEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSaving(true);
  setErrors({});

  const courseData = {
    title,
    course_code: courseCode,
    description,
    credits,
    duration,
    difficulty_level: difficultyLevel,
    teacher_email: teacher_email || null,
  };

  try {
    const response = await fetch('/api/courses/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrors(result.errors || {});
      setSaving(false);
      return;
    }

    router.push('/dashboard/Courses');
  } catch (error) {
    console.error('Something went wrong:', error);
    setSaving(false);
  }
};

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id='title'
          label="Title"
          type='text'
          placeholder='Enter course title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title?.join(', ')}
          required
        />
        <Input
          id='courseCode'
          label="Course Code"
          type='text'
          placeholder='Enter course code'
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          error={errors.course_code?.join(', ')}
          required
        />
        <Input
          id='description'
          label="Description"
          type='text'
          placeholder='Enter course description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description?.join(', ')}
          required
        />
        <Input
          id='credits'
          label="Credits"
          type="number"
          placeholder="Enter number of credits"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          error={errors.credits?.join(', ')}
          required
        />
        <Input
          id='duration'
          label="Duration"
          type="text"
          placeholder="Enter course duration (e.g., 10 weeks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          error={errors.duration?.join(', ')}
          required
        />

        <Input
          id='difficultyLevel'
          label="Difficulty Level"
          type="select"
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
          error={errors.difficulty_level?.join(', ')}
          required
        />

        <Input
          id='teacher_email'
          label="Teacher's Email"
          type='email'
          placeholder='Enter teacher email (optional)'
          value={teacher_email}
          onChange={(e) => setTeacherEmail(e.target.value)}
          error={errors.teacher_email?.join(', ')}
          required={false} 
        />

        <div className="lex justify-end gap-4 mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button 
          type="submit" 
          disabled={saving} 
          className="bg-blue-600 text-white hover:bg-cyan-900">
            {saving ? 'Saving...' : 'Add Course'}
          </Button>
          
        </div>
      </form>
    </div>
  );
}
