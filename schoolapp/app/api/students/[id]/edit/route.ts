import { NextResponse } from 'next/server';
import type { Student } from '@/app/lib/definitions';
import { updateStudent } from '@/app/lib/actions';

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const {
      firstname,
      lastname,
      email,
      grade,
      dateofbirth = null,
      address = null,
      phonenumber = null,
      enrollmentdate = null,
      parentscontact = null,
      notes = null,
      avatarurl = null,
    } = body;

    if (!firstname || typeof firstname !== 'string' || firstname.trim() === '') {
      return NextResponse.json({ error: 'First name is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!lastname || typeof lastname !== 'string' || lastname.trim() === '') {
      return NextResponse.json({ error: 'Last name is required and must be a non-empty string.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!grade || typeof grade !== 'string' || grade.trim() === '') {
      return NextResponse.json({ error: 'Grade is required and must be a non-empty string.' }, { status: 400 });
    }
    for (const [fieldName, fieldValue] of Object.entries({
      dateofbirth,
      address,
      phonenumber,
      enrollmentdate,
      parentscontact,
      notes,
      avatarurl,
    })) {
      if (fieldValue !== null && typeof fieldValue !== 'string') {
        return NextResponse.json({ error: `${fieldName} must be a string or null.` }, { status: 400 });
      }
    }

    const result: Student | { errors?: any; message?: string } = await updateStudent({ id, ...body });

    if ('errors' in result) {
      return NextResponse.json({ errors: result.errors, message: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Student updated successfully', student: result });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Failed to update student.' }, { status: 500 });
  }
}
