'use client';

import React, { useState } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import CourseDropdown from '@/app/ui/CourseDropdown';
import TeacherDropdown from '@/app/ui/teacherDropdown';
import StudentDropdown from '@/app/ui/studentDropdown';

export default function AddEnrollmentPage() {
  const router = useRouter();

  const [studentId, setStudentId] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');
  const [teacherId, setTeacherId] = useState<string>('');
  const [enrollmentDate, setEnrollmentDate] = useState<string>('');
  const [completionStatus, setCompletionStatus] = useState<string>('enrolled');
  const [grade, setGrade] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setErrors({});

    const enrollmentData = {
      student_id: studentId,
      course_id: courseId,
      teacher_id: teacherId,
      enrollment_date: enrollmentDate,
      completion_status: completionStatus,
      grade: grade,
      notes: notes,
    };

    try {
      const response = await fetch('/api/Enrollments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || {});
        setSaving(false);
        return;
      }
      alert('Enrollment created successfully!');
      router.push('/dashboard/Enrollments');
    } catch (error) {
      console.error('Something went wrong:', error);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Enrollment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="course-dropdown" className="block text-gray-700 text-sm font-bold mb-2">
            Student
          </label>
          <StudentDropdown
            value={studentId}
            onChange={setStudentId}
          />
          {errors.course_id && (
            <p className="text-red-500 text-xs mt-1">{errors.course_id.join(', ')}</p>
          )}
        </div>

        <div>
          <label htmlFor="course-dropdown" className="block text-gray-700 text-sm font-bold mb-2">
            Course
          </label>
          <CourseDropdown
            value={courseId}
            onChange={setCourseId}
          />
          {errors.course_id && (
            <p className="text-red-500 text-xs mt-1">{errors.course_id.join(', ')}</p>
          )}
        </div>

        <div>
          <label htmlFor="course-dropdown" className="block text-gray-700 text-sm font-bold mb-2">
            Teacher
          </label>
          <TeacherDropdown
            value={teacherId}
            onChange={setTeacherId}
          />
          {errors.course_id && (
            <p className="text-red-500 text-xs mt-1">{errors.course_id.join(', ')}</p>
          )}
        </div>

        <Input
          id="enrollment-date"
          label="Enrollment Date"
          type="date"
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          required
          error={errors.enrollment_date?.join(', ')}
        />
        <div>
          <label htmlFor="completion-status" className="block text-gray-700 text-sm font-bold mb-2">
            Completion Status
          </label>
          <select
            id="completion-status"
            value={completionStatus}
            onChange={e => setCompletionStatus(e.target.value)}
            required
            className="w-full border rounded p-2"
          >
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
            <option value="Enrolled">Enrolled</option>
            <option value="In-Progress">In Progress</option>
          </select>
          {errors.completion_status && (
            <p className="text-red-500 text-xs mt-1">{errors.completion_status.join(', ')}</p>
          )}
        </div>
        <Input
          id="notes"
          label="Notes"
          type="text"
          value={notes || ''}
          onChange={(e) => setNotes(e.target.value)}
          error={errors.notes?.join(', ')}
        />

        <Input
          id="grade"
          label="Grade"
          type="text"
          value={grade || ''}
          onChange={(e) => setGrade(e.target.value)}
          error={errors.grade?.join(', ')}
        />

        <Button type="submit" disabled={saving} className="w-full">
          {saving ? 'Saving...' : 'Add Enrollment'}
        </Button>
      </form>
      <Button
        variant="secondary"
        onClick={() => router.push('/dashboard/Enrollments')}
        className="mt-4 w-full"
      >
        Cancel
      </Button>
    </div>
  );
}