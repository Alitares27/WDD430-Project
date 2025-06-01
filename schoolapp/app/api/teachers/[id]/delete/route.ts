import { deleteTeacher } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const result = await deleteTeacher(id);

        if (result?.message === 'Teacher not found.') {
            return NextResponse.json({ error: result.message }, { status: 404 });
        }

        return NextResponse.json({ message: result.message });
    } catch  {
        return NextResponse.json(
            { error: 'Failed to delete teacher.' },
            { status: 500 }
        );
    }
}
