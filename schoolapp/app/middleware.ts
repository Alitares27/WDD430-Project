import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const pathname = req.nextUrl.pathname;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
        token.role === "student" &&
        (
            pathname.startsWith("/dashboard/Users") ||
            pathname.startsWith("/dashboard/Courses") ||
            pathname.startsWith("/dashboard/Teachers")
        )
    ) {
        return NextResponse.redirect(new URL("/dashboard/profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};
