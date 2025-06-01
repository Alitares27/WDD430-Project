import { NextResponse } from 'next/server';
import { createStudent } from '@/app/lib/actions';

export async function POST(request: Request) {
    const formData = await request.formData();
    const result = await createStudent(formData);

    if (result.errors) {
        return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result, { status: 201 });
}