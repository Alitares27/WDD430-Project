import { NextResponse } from 'next/server';
import { getTeachers } from '@/app/lib/data';
import { updateTeacher, deleteTeacher } from '@/app/lib/actions';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const teachers = await getTeachers();
        const teacher = teachers.find((t: any) => String(t.id) === id);
        if (!teacher) {
            return NextResponse.json({ error: 'Teacher not found.' }, { status: 404 });
        }
        return NextResponse.json(teacher);
    } catch  {
        return NextResponse.json({ error: 'Failed to fetch teacher.' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        const {
            firstname,
            lastname,
            email,
            subject,
            dateofbirth = null,
            address = null,
            phonenumber = null,
            hiredate = null,
            notes = null,
            avatarurl = null,
        } = body;

        if (!firstname || typeof firstname !== 'string' || firstname.trim().length === 0) {
            return NextResponse.json({ error: 'First name is required and must be a non-empty string.' }, { status: 400 });
        }

        if (!lastname || typeof lastname !== 'string' || lastname.trim().length === 0) {
            return NextResponse.json({ error: 'Last name is required and must be a non-empty string.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
        }

        if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
            return NextResponse.json({ error: 'Subject is required and must be a non-empty string.' }, { status: 400 });
        }

        if (dateofbirth && typeof dateofbirth !== 'string') {
            return NextResponse.json({ error: 'Date of birth must be a string.' }, { status: 400 });
        }
        if (address && typeof address !== 'string') {
            return NextResponse.json({ error: 'Address must be a string.' }, { status: 400 });
        }
        if (phonenumber && typeof phonenumber !== 'string') {
            return NextResponse.json({ error: 'Phone number must be a string.' }, { status: 400 });
        }
        if (hiredate && typeof hiredate !== 'string') {
            return NextResponse.json({ error: 'Hire date must be a string.' }, { status: 400 });
        }
        if (notes && typeof notes !== 'string') {
            return NextResponse.json({ error: 'Notes must be a string.' }, { status: 400 });
        }
        if (avatarurl && typeof avatarurl !== 'string') {
            return NextResponse.json({ error: 'Avatar URL must be a string.' }, { status: 400 });
        }

        const result = await updateTeacher({ id, ...body });

        if (result?.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ message: 'Teacher updated successfully', teacher: result });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update teacher.' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const result = await deleteTeacher(id);

        if (typeof result === 'object' && result !== null && 'error' in result) {
            return NextResponse.json({ error: (result as any).error }, { status: 400 });
        }

        return NextResponse.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete teacher.' }, { status: 500 });
    }
}
