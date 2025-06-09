import { NextResponse } from 'next/server';
import { getStudents } from '@/app/lib/data';
import { updateStudent } from '@/app/lib/actions';
import type { Student } from '@/app/lib/definitions';

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await request.json();
        const students: Student[] = await getStudents();
        const studentIndex = students.findIndex((s: Student) => String(s.id) === id);

        if (studentIndex === -1) {
            return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
        }

        const updatedStudent: Student = { ...students[studentIndex], ...body };

        const safeUpdatedStudent = {
            ...updatedStudent,
            address: updatedStudent.address ?? "",
            phonenumber: updatedStudent.phonenumber ?? "",
            enrollmentdate: updatedStudent.enrollmentdate ?? "",
            parentscontact: updatedStudent.parentscontact ?? "",
        };
        await updateStudent(safeUpdatedStudent);
        return NextResponse.json(safeUpdatedStudent);
    } catch {
        return NextResponse.json({ error: 'Failed to update student.' }, { status: 500 });
    }
}