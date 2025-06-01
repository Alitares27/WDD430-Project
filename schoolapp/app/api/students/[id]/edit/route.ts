import { NextResponse } from 'next/server';
import { getStudents } from '@/app/lib/data';
import { updateStudent } from '@/app/lib/actions';
import type { Student } from '@/app/lib/definitions';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        const students: Student[] = await getStudents();
        const studentIndex = students.findIndex((s: Student) => String(s.id) === id);

        if (studentIndex === -1) {
            return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
        }
        const updatedStudent: Student = { ...students[studentIndex], ...body };
        await updateStudent(updatedStudent);
        return NextResponse.json(updatedStudent);
    } catch  {
        return NextResponse.json({ error: 'Failed to update student.' }, { status: 500 });
    }
}

