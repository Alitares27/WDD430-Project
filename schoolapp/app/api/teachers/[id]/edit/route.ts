import { NextResponse } from 'next/server';
import { getTeachers } from '@/app/lib/data';
import { updateTeacher } from '@/app/lib/actions';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        const teachers = await getTeachers();
        const teacherIndex = teachers.findIndex((t: any) => String(t.id) === id);

        if (teacherIndex === -1) {
            return NextResponse.json({ error: 'Teacher not found.' }, { status: 404 });
        }

        const updatedTeacher = { ...teachers[teacherIndex], ...body };

        await updateTeacher(updatedTeacher);

        return NextResponse.json(updatedTeacher);
    } catch  {
        return NextResponse.json({ error: 'Failed to update teacher.' }, { status: 500 });
    }
}
