import { deleteCourse } from "@/app/lib/actions";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extrae el ID desde la URL

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

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
