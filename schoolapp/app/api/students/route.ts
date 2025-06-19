import { NextResponse } from 'next/server';
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const studentEmail = url.searchParams.get('studentEmail');
    const teacherId = url.searchParams.get('teacherId');

    if (studentEmail) {
      const student = await sql`
        SELECT * FROM students WHERE email = ${studentEmail}
      `;
      if (student.length === 0) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }
      return NextResponse.json(student[0]);
    }

    if (teacherId) {
      const students = await sql`
        SELECT s.*
        FROM students s
        JOIN enrollments e ON e.student_id = s.id
        WHERE e.teacher_id = ${teacherId}
      `;
      return NextResponse.json(students);
    }

    const allStudents = await sql`SELECT * FROM students`;
    return NextResponse.json(allStudents);

  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
