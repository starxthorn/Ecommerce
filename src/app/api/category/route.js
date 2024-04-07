import db from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db();
    const { name } = await req.json();
    const category = await Category.create({ name });
    return NextResponse.json(
      {
        message: "Category Created",
        response: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  try {
    await db();
    const category = await Category.find();
    return NextResponse.json(
      {
        response: category,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
    const category = await Category.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Category Deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
