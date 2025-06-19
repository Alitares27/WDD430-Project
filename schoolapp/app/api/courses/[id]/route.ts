import { NextResponse } from 'next/server';
import { getCourseById } from '@/app/lib/data';
import { updateCourse, deleteCourse } from '@/app/lib/actions';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const course = await getCourseById(params.id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch course.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, course_code, description, credits, duration, difficulty_level, teacher_email } = body;

    if (!title || !course_code || !description || !credits || !duration || !difficulty_level || !teacher_email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const result = await updateCourse({ id: params.id, ...body });

    if (!result) {
      return NextResponse.json({ error: 'Course not found or update failed.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course updated successfully', course: result });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update course.' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteCourse(params.id);

    if (!result) {
      return NextResponse.json({ error: 'Course not found or deletion failed.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete course.' }, { status: 500 });
  }
}
