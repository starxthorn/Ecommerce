import db from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email");
  try {
    await db();
    const user = await User.findOne({ email });
    return NextResponse.json({
      response: user,
    });
  } catch (error) {
    console.log(error);
  }
}
