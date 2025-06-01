import { deleteStudent } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await deleteStudent(id);

    if (result?.message === 'Student not found.') {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json({ message: result.message });
  } catch  {
    return NextResponse.json(
      { error: 'Failed to delete student.' },
      { status: 500 }
    );
  }
}
