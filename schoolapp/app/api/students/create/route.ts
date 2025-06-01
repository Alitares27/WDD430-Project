import { NextResponse } from 'next/server';
import { createStudent } from '@/app/lib/actions';

export async function POST(request: Request) {
    const jsonData = await request.json();
    const result = await createStudent(jsonData);

    if (result.errors) {
        return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result, { status: 201 });
}
