import { deleteCourse } from "@/app/lib/actions";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await deleteCourse(id);

    if (result?.message === "Course not found.") {
      return NextResponse.json({ error: result.message }, { status: 404 });
    }

    return NextResponse.json({ message: result.message });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete course." },
      { status: 500 }
    );
  }
}