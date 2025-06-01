import { NextResponse } from 'next/server';
import { createTeacher } from '@/app/lib/actions';

export async function POST(request: Request) {
  try {
    const jsonData = await request.json();
    const result = await createTeacher(jsonData);

    if (result.errors) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Teacher created', teacher: result },
      { status: 201 }
    );
  } catch  {
    return NextResponse.json(
      { error: 'Server error. Failed to create teacher.' },
      { status: 500 }
    );
  }
}
