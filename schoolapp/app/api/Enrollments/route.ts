import { NextResponse } from 'next/server';
import { getEnrollments } from '@/app/lib/data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/authOptions';

interface Enrollment {
  enrollment_id: string;
  enrollment_date: string;
  completion_status: string;
  notes: string | null;
  student_id: string;
  student_first_name: string;
  student_last_name: string;
  student_email: string;
  course_id: string;
  course_title: string;
  course_code: string;
  course_description: string;
  course_credits: number;
  course_duration: string;
  course_difficulty_level: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_email: string;
  teacher_subject: string;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let enrollments: Enrollment[] = await getEnrollments();

    const userRole = session.user.role;
    const userId = session.user.id;

    if (userRole === 'student') {
      enrollments = enrollments.filter(enr => enr.student_id === userId);
    } 

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json({ error: 'Failed to fetch enrollments.' }, { status: 500 });
  }
}
