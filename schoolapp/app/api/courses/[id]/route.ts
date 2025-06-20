import { NextResponse } from 'next/server';
import { getCourseById } from '@/app/lib/data';
import { updateCourse, deleteCourse } from '@/app/lib/actions';

function getIdFromRequest(request: Request): string | null {
  const url = new URL(request.url);
  const parts = url.pathname.split('/');
  return parts[parts.length - 1] || null;
}

export async function GET(request: Request) {
  try {
    const id = getIdFromRequest(request);
    if (!id) return NextResponse.json({ error: 'ID missing' }, { status: 400 });

    const course = await getCourseById(id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch course.' }, { status: 500 });
  }
}
