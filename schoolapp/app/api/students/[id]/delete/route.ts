import { NextResponse } from 'next/server';
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const studentId = params.id;

    await sql`DELETE FROM students WHERE id = ${studentId}`;

    return NextResponse.json({ message: 'Student deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
