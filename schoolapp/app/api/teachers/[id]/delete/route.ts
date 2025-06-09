import { deleteTeacher } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop(); 

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const result = await deleteTeacher(id);

        if (result?.message === 'Teacher not found.') {
            return NextResponse.json({ error: result.message }, { status: 404 });
        }

        return NextResponse.json({ message: result.message });
    } catch {
        return NextResponse.json(
            { error: 'Failed to delete teacher.' },
            { status: 500 }
        );
    }
}
