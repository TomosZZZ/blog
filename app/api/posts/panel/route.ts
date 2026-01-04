import { auth } from "@/features/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope") ?? "ALL";
  const res = await fetch(
    `http://localhost:8080/api/posts/panel?scope=${scope}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
