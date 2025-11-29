import { NextResponse } from 'next/server';
import { getUsers } from '@/app/lib/data';
import { updateUser, deleteUser } from '@/app/lib/actions';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const users = await getUsers();

        function isUser(obj: unknown): obj is { user_id: string | number } {
            return typeof obj === 'object' && obj !== null && 'user_id' in obj;
        }

        const user = (users as unknown[]).find((u) => isUser(u) && String(u.user_id) === id);

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch user.' }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await request.json();
        const {
            username,
            email,
            password_hash,
            first_name,
            last_name,
            role,
            is_active,
            is_email_confirmed,
            updated_at,
        } = body;

        if (!password_hash || typeof password_hash !== 'string' || password_hash.trim().length === 0) {
            return NextResponse.json({ error: 'Password hash is required and must be a non-empty string.' }, { status: 400 });
        }

        if (!first_name || typeof first_name !== 'string' || first_name.trim().length === 0) {
            return NextResponse.json({ error: 'First name is required and must be a non-empty string.' }, { status: 400 });
        }

        if (!last_name || typeof last_name !== 'string' || last_name.trim().length === 0) {
            return NextResponse.json({ error: 'Last name is required and must be a non-empty string.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
        }

        if (!role || !['student', 'teacher', 'admin'].includes(role)) {
            return NextResponse.json({ error: 'Role must be one of: student, teacher, admin.' }, { status: 400 });
        }
        if (typeof is_active !== 'boolean') {
            return NextResponse.json({ error: 'is_active must be a boolean.' }, { status: 400 });
        }

        if (typeof is_email_confirmed !== 'boolean') {
            return NextResponse.json({ error: 'is_email_confirmed must be a boolean.' }, { status: 400 });
        }

        if (updated_at && typeof updated_at !== 'string') {
            return NextResponse.json({ error: 'Updated at must be a string.' }, { status: 400 });
        }

        const result = await updateUser({ id, ...body });

        function hasErrors(obj: unknown): obj is { errors: Record<string, string[]>; message: string } {
            return typeof obj === 'object' && obj !== null && 'errors' in obj && 'message' in obj;
        }

        if (hasErrors(result)) {
            return NextResponse.json({ error: result.message, errors: result.errors }, { status: 400 });
        }

        return NextResponse.json({ message: 'User updated successfully', user: result });
    } catch {
        return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const result = await deleteUser(id);

        function hasError(obj: unknown): obj is { error: string } {
            return typeof obj === 'object' && obj !== null && 'error' in obj;
        }

        if (hasError(result)) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
    }
}
