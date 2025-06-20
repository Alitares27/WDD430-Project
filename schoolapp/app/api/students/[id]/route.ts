import { NextResponse } from 'next/server';
import { getStudentById } from '@/app/lib/data';

export async function GET(
  request: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const student = await getStudentById(params.id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch student.' }, { status: 500 });
  }
}
