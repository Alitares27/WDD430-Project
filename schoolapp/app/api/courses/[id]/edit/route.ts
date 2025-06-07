import { NextResponse } from 'next/server';
import { getCourses } from '@/app/lib/data';
import { updateCourse } from '@/app/lib/actions';
import type { Course } from '@/app/lib/definitions';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validaciones de campos requeridos
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json({ error: 'Course name is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!body.course_code || typeof body.course_code !== 'string' || body.course_code.trim().length === 0) {
      return NextResponse.json({ error: 'Course code is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!body.description || typeof body.description !== 'string' || body.description.trim().length === 0) {
      return NextResponse.json({ error: 'Course description is required and must be a non-empty string.' }, { status: 400 });
    }
    if (typeof body.credits !== 'number' || body.credits < 1 || !Number.isInteger(body.credits)) {
      return NextResponse.json({ error: 'Credits must be an integer greater than 0.' }, { status: 400 });
    }
    if (!body.duration || typeof body.duration !== 'string' || body.duration.trim().length === 0) {
      return NextResponse.json({ error: 'Course duration is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!body.difficulty_level || typeof body.difficulty_level !== 'string' || body.difficulty_level.trim().length === 0) {
      return NextResponse.json({ error: 'Difficulty level is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!body.teacher_email || typeof body.teacher_email !== 'string' || body.teacher_email.trim().length === 0) {
      return NextResponse.json({ error: 'Teacher Email is required and must be a non-empty string.' }, { status: 400 });
    }

    const rows = await getCourses();
    const courses: Course[] = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      course_code: row.course_code,
      description: row.description,
      credits: row.credits,
      department: row.department,
      duration: row.duration,
      difficulty_level: row.difficulty_level,
      teacher_email: row.teacher_email,
    }));
    const courseIndex = courses.findIndex((c: Course) => String(c.id) === id);

    if (courseIndex === -1) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    }

    const updatedCourse: Course = { ...courses[courseIndex], ...body };
    const result = await updateCourse(updatedCourse);

    if (result?.errors) {
      return NextResponse.json({ error: result.message, errors: result.errors }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ error: 'Course not found or update failed.' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update course.' }, { status: 500 });
  }
}