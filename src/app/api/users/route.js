import db from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await db();
    const users = await User.find();
    return NextResponse.json({
      response: users,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  try {
    await db();
    const id = req.nextUrl.searchParams.get("id");
    let user = await User.findByIdAndUpdate(id, await req.json(), {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return NextResponse.json({
      message: "User Updated",
      response: user,
    });
  } catch (error) {
    console.log(error);
  }
}
