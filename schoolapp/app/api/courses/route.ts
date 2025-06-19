import { NextResponse } from 'next/server';
import { getCourses } from '../../lib/data';
import { Course } from '@/app/lib/definitions';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const teacherEmail = url.searchParams.get('teacherEmail');

    let courses: Course[] = await getCourses();

    if (teacherEmail) {
      courses = courses.filter(course => course.teacher_email === teacherEmail);
    }

    return NextResponse.json(courses);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch courses.' },
      { status: 500 }
    );
  }
}
