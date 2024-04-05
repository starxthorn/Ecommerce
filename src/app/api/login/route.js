import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    await db();
    const { email, password } = await req.json();
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return NextResponse.json(
        {
          message: "User does not exists",
        },
        { status: 400 }
      );
    }
    const comparepassword = await bcrypt.compare(password, userExist.password);
    if (comparepassword) {
      return NextResponse.json(
        {
          message: "User Logged In",
          response: userExist,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
