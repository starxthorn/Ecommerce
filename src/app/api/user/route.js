import db from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({
      response: user,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
    await User.findByIdAndDelete(id);
    return NextResponse.json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
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
