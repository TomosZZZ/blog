import { auth } from "@/features/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const res = await fetch("http://localhost:8080/api/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  return NextResponse.json(data, { status: res.status });
}
