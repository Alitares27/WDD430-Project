import { NextResponse } from "next/server";
import postgres from "postgres";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const studentId = segments.at(-2);

    if (!studentId) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await sql`DELETE FROM students WHERE id = ${studentId}`;

    return NextResponse.json({ message: "Student deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
