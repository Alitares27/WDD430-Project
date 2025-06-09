import { NextResponse } from 'next/server';
import { getCourses } from '@/app/lib/data';
import { updateCourse, deleteCourse } from '@/app/lib/actions';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extrae el ID desde la URL

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const courses = await getCourses();

    function isCourse(obj: unknown): obj is { id: string | number } {
      return typeof obj === 'object' && obj !== null && 'id' in obj;
    }

    const course = (courses as unknown[]).find((s) => isCourse(s) && String(s.id) === id);

    if (!course) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch course.' }, { status: 500 });
  }
}


export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await request.json();

    const {
      title, course_code, description, credits, duration, difficulty_level, teacher_email
    } = body;

    // Validaciones de campos requeridos
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Course name is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!course_code || typeof course_code !== 'string' || course_code.trim().length === 0) {
      return NextResponse.json({ error: 'Course code is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'Course description is required and must be a non-empty string.' }, { status: 400 });
    }
    if (typeof credits !== 'number' || credits < 1 || !Number.isInteger(credits)) {
      return NextResponse.json({ error: 'Credits must be at least 1.' }, { status: 400 });
    }
    if (!duration || typeof duration !== 'string' || duration.trim().length === 0) {
      return NextResponse.json({ error: 'Course duration is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!difficulty_level || typeof difficulty_level !== 'string' || difficulty_level.trim().length === 0) {
      return NextResponse.json({ error: 'Difficulty level is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!teacher_email || typeof teacher_email !== 'string' || teacher_email.trim().length === 0) {
      return NextResponse.json({ error: 'Teacher Email is required and must be a non-empty string.' }, { status: 400 });
    }

    // Actualiza el curso
    const result = await updateCourse({ id, ...body });

    if (result?.errors) {
      console.error('Validation errors:', result.errors);
      return NextResponse.json({ error: result.message, errors: result.errors }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ error: 'Course not found or update failed.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course updated successfully', course: result });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update course.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params; 
    const result = await deleteCourse(id);
    if (!result) {
      return NextResponse.json({ error: 'Course not found or deletion failed.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete course.' }, { status: 500 });
  }
}