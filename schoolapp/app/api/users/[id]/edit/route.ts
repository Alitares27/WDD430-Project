import { NextResponse } from 'next/server';
import { getUsers } from '@/app/lib/data';
import { updateUser } from '@/app/lib/actions';
import type { Users } from '@/app/lib/definitions';

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await request.json();
        const users: Users[] = await getUsers();
        const userIndex = users.findIndex((u: Users) => String(u.user_id) === id);

        if (userIndex === -1) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        const updatedUser: Users = { ...users[userIndex], ...body };
        await updateUser(updateUser);
        return NextResponse.json(updatedUser);
    } catch {
        return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
    }
}
