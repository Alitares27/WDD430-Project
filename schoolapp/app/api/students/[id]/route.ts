import { NextResponse } from 'next/server';
import { getStudents } from '@/app/lib/data';
import { updateStudent, deleteStudent } from '@/app/lib/actions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const students = await getStudents();

    function isStudent(obj: unknown): obj is { id: string | number } {
      return typeof obj === 'object' && obj !== null && 'id' in obj;
    }

    const student = (students as unknown[]).find((s) => isStudent(s) && String(s.id) === id);

    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch student.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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

    if (!firstname || typeof firstname !== 'string' || firstname.trim().length === 0) {
      return NextResponse.json({ error: 'First name is required and must be a non-empty string.' }, { status: 400 });
    }

    if (!lastname || typeof lastname !== 'string' || lastname.trim().length === 0) {
      return NextResponse.json({ error: 'Last name is required and must be a non-empty string.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    if (!grade || typeof grade !== 'string' || grade.trim().length === 0) {
      return NextResponse.json({ error: 'Grade is required and must be a non-empty string.' }, { status: 400 });
    }

    if (dateofbirth && typeof dateofbirth !== 'string') {
      return NextResponse.json({ error: 'Date of birth must be a string.' }, { status: 400 });
    }
    if (address && typeof address !== 'string') {
      return NextResponse.json({ error: 'Address must be a string.' }, { status: 400 });
    }
    if (phonenumber && typeof phonenumber !== 'string') {
      return NextResponse.json({ error: 'Phone number must be a string.' }, { status: 400 });
    }
    if (enrollmentdate && typeof enrollmentdate !== 'string') {
      return NextResponse.json({ error: 'Enrollment date must be a string.' }, { status: 400 });
    }
    if (parentscontact && typeof parentscontact !== 'string') {
      return NextResponse.json({ error: 'Parents contact must be a string.' }, { status: 400 });
    }
    if (notes && typeof notes !== 'string') {
      return NextResponse.json({ error: 'Notes must be a string.' }, { status: 400 });
    }
    if (avatarurl && typeof avatarurl !== 'string') {
      return NextResponse.json({ error: 'Avatar URL must be a string.' }, { status: 400 });
    }

    const result = await updateStudent({ id, ...body });

    if (result.errors) {
       return NextResponse.json({ errors: result.errors, message: result.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Student updated successfully', student: result });
  } catch {
    return NextResponse.json({ error: 'Failed to update student.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await deleteStudent(id);

    function hasError(obj: unknown): obj is { error: string } {
      return typeof obj === 'object' && obj !== null && 'error' in obj;
    }

    if (hasError(result)) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete student.' }, { status: 500 });
  }
}