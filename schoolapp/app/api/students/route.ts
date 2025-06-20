import { NextResponse } from 'next/server';
import { getStudents, getStudentsByTeacherId, getStudentByEmail } from '@/app/lib/data';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const teacherId = url.searchParams.get('teacherId');
    const studentEmail = url.searchParams.get('studentEmail');

    if (teacherId) {
      const students = await getStudentsByTeacherId(teacherId);
      return NextResponse.json(students);
    }

    if (studentEmail) {
      const student = await getStudentByEmail(studentEmail);
      return NextResponse.json(student);
    }

    const students = await getStudents();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students.' }, { status: 500 });
  }
}
