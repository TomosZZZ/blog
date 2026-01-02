import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  return NextResponse.json(data, {
    status: res.status,
  });
};
