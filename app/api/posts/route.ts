import { auth } from "@/features/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:8080/api/posts", {
    method: "GET",
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch("http://localhost:8080/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}
