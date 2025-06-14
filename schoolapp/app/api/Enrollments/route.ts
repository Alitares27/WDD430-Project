import { NextResponse } from 'next/server';
import { getEnrollments } from '@/app/lib/data';

export async function GET() {
  try {
    const enrollments = await getEnrollments();
    return NextResponse.json(enrollments);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch enrollments.' }, { status: 500 });
  }
}