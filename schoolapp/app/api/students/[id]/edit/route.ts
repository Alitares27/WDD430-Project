import { NextResponse } from 'next/server';
import postgres from 'postgres';
import type { Student } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').at(-2); 

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await request.json();

    const { firstname, lastname, email, grade } = body;

    if (!firstname || !lastname || !email || !grade) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await sql`
      UPDATE students 
      SET firstname = ${firstname}, lastname = ${lastname}, email = ${email}, grade = ${grade}
      WHERE id = ${id}
    `;

    const updated = await sql<Student[]>`
      SELECT id, firstname, lastname, email, grade FROM students WHERE id = ${id}
    `;

    if (!updated.length) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student updated successfully', student: updated[0] }, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
