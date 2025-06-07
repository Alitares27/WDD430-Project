import { NextResponse } from 'next/server';
import { getCourses } from '../../lib/data';

export async function GET() {
    try {
        const courses = await getCourses();
        return NextResponse.json(courses);
    } catch  {
        return NextResponse.json({ error: 'Failed to fetch courses.' }, { status: 500 });
    }
}

