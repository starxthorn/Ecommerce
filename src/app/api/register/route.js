import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    await db();
    const { name, email, password, location, phone } = await req.json();
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      location,
      phone,
    });
    return NextResponse.json(
      {
        message: "User created successfully",
        response: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
