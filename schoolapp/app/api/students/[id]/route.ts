import { NextResponse } from 'next/server';
import { getStudentById } from '@/app/lib/data';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(Boolean); 
    const id = pathSegments[pathSegments.length - 1];

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const student = await getStudentById(id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch student.' }, { status: 500 });
  }
}
