import db from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await db();
    const id = req.nextUrl.searchParams.get("id");
    const user = await User.findOne({ _id: id });
    return NextResponse.json({
      response: user,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    await db();
    const id = req.nextUrl.searchParams.get("id");
    await User.findByIdAndDelete(id);
    return NextResponse.json({
      message: "User deleted",
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
