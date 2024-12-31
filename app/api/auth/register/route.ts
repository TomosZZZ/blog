import { SignupDto } from "@/features";
import { NextResponse } from "next/server";
import { userService } from "@/features/user";

export const POST = async (req: Request) => {
  try {
    const data = (await req.json()) as SignupDto;
    await userService.createUser(data);
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
