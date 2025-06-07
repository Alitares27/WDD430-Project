import { NextResponse } from 'next/server';
import { createCourse } from '@/app/lib/actions';

export async function POST(request: Request) {
  try {
    const jsonData = await request.json();
    const result = await createCourse(jsonData);

    if (result.errors) {
      return NextResponse.json(result, { status: 400 });
    }

    if (result.message?.startsWith('Database error')) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}