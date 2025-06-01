import { NextResponse } from 'next/server';
import { getTeachers } from '@/app/lib/data';
import { updateTeacher } from '@/app/lib/actions';
import type { Teacher } from '@/app/lib/definitions';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        const teachers: Teacher[] = await getTeachers();
        const teacherIndex = teachers.findIndex((t: Teacher) => String(t.id) === id);

        if (teacherIndex === -1) {
            return NextResponse.json({ error: 'Teacher not found.' }, { status: 404 });
        }
        const updatedTeacher: Teacher = { ...teachers[teacherIndex], ...body };
        await updateTeacher(updatedTeacher);
        return NextResponse.json(updatedTeacher);
    } catch  {
        return NextResponse.json({ error: 'Failed to update teacher.' }, { status: 500 });
    }
}
