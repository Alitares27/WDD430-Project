import { NextResponse } from 'next/server';
import { createUser } from '@/app/lib/actions';

export async function POST(request: Request) {
    try {
        const jsonData = await request.json();
        const result = await createUser(jsonData);

        return NextResponse.json(
            { message: 'User created', user: result },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Server error. Failed to create user.' },
            { status: 500 }
        );
    }
}
