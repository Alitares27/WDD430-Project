import { deleteStudent } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const id = segments[segments.length - 2] === 'delete'
      ? segments[segments.length - 3]
      : segments.pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const result = await deleteStudent(id);

    if (result?.message === 'Student not found.') {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json({ message: result.message });
  } catch (error) {
    console.error('Failed to delete student:', error);
    return NextResponse.json({ error: 'Failed to delete student.' }, { status: 500 });
  }
}
