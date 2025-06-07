'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import { useParams, useRouter } from 'next/navigation';

interface Course {
    id: string;
    title: string;
    course_code: string;
    description: string;
    credits: number;
    duration: string;
    difficulty_level: string;
    teacher_email: string;
}

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id as string;
    const [title, setTitle] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [credits, setCredits] = useState<number>(0);
    const [duration, setDuration] = useState<string>('');
    const [difficultyLevel, setDifficultyLevel] = useState<string>('Beginner');
    const [teacherEmail, setTeacherEmail] = useState<string>('default-teacher');
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const res = await fetch(`/api/courses/${courseId}`);
                if (!res.ok) throw new Error('Course not found.');
                const data: Course = await res.json();

                setTitle(data.title || '');
                setCourseCode(data.course_code || '');
                setDescription(data.description || '');
                setCredits(data.credits || 0);
                setDuration(data.duration || '');
                setDifficultyLevel(data.difficulty_level || 'Beginner');
                setTeacherEmail(data.teacher_email || 'default-teacher');
            } catch (error) {
                console.error("Error fetching course data:", error);
                setFetchError('Error loading course data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseData();
        }
    }, [courseId]);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormErrors: { [key: string]: string } = {};
    if (!title.trim()) newFormErrors.title = 'Title is required.';
    if (!courseCode.trim()) newFormErrors.courseCode = 'Course Code is required.';
    if (!description.trim()) newFormErrors.description = 'Description is required.';
    if (credits <= 0) newFormErrors.credits = 'Credits must be a positive number.';
    if (!duration.trim()) newFormErrors.duration = 'Duration is required.';
    if (!difficultyLevel.trim()) newFormErrors.difficultyLevel = 'Difficulty Level is required.';
    if (!teacherEmail.trim()) newFormErrors.teacherEmail = 'Teacher Email is required.';

    setFormErrors(newFormErrors);
    if (Object.keys(newFormErrors).length === 0) {
        setSaving(true);
        try {
            const updatedCourseData: Partial<Course> = {
                title,
                course_code: courseCode,
                description,
                credits,
                duration,
                difficulty_level: difficultyLevel,
                teacher_email: teacherEmail,
            };

            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCourseData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                // Si el backend devuelve errores de campos, los mostramos
                if (errorData.errors) {
                    const fieldErrors: { [key: string]: string } = {};
                    for (const key in errorData.errors) {
                        if (Array.isArray(errorData.errors[key]) && errorData.errors[key].length > 0) {
                            fieldErrors[key] = errorData.errors[key][0];
                        }
                    }
                    setFormErrors(fieldErrors);
                } else if (errorData.error) {
                    setFormErrors({ submit: errorData.error });
                } else {
                    setFormErrors({ submit: 'Failed to update course. Please try again.' });
                }
                return;
            }
            alert('Course updated successfully!');
            router.push(`/dashboard/Courses/${courseId}`);
        } catch (error) {
            console.error("Error updating course:", error);
            setFormErrors({ submit: 'Failed to update course. Please try again.' });
        } finally {
            setSaving(false);
        }
    }
};

    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center text-gray-600">
                <h1 className="text-3xl font-bold mb-4">Edit Course</h1>
                <p>Loading course data...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Course</h1>
            {fetchError && <p className="text-red-600 mb-4">{fetchError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                        id='title'
                        label="Title"
                        type='text'
                        placeholder='Enter course title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={formErrors.title}
                        required
                    />
                    <Input
                        id='courseCode'
                        type='text'
                        placeholder='Enter course code'
                        label="Course Code"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        error={formErrors.courseCode}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={5}
                        className={`
                        shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline resize-y
                        ${formErrors.description ? 'border-red-500' : 'border-gray-300'}
                        `}
                        placeholder="Enter any additional notes about the student..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {formErrors.description && (
                        <p className="text-red-500 text-xs italic mt-1">{formErrors.description}</p>
                    )}
                </div>

                <Input
                    id='credits'
                    label="Credits"
                    type="number"
                    placeholder="Enter number of credits"
                    min="1"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    error={formErrors.credits}
                />
                <Input
                    id='duration'
                    type="text"
                    placeholder="Enter course duration (e.g., 10 weeks)"
                    label="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    error={formErrors.duration}
                />
                <Input
                    id='difficultyLevel'
                    type="text"
                    label="Difficulty Level"
                    value={difficultyLevel}
                    placeholder="Enter difficulty level (e.g., Beginner, Intermediate, Advanced)"
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    error={formErrors.difficultyLevel}
                />
                <Input
                    id='teacherEmail'
                    type="textarea"
                    label="Teacher Email"
                    value={teacherEmail}
                    placeholder="Enter teacher Email"
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    error={formErrors.teacherEmail}
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
                    <Button type="submit" variant='primary' disabled={saving} className="w-full">
                        {saving ? 'Saving...' : 'Update Course'}
                    </Button>
                </div>
            </form>
        </div>
    );
}