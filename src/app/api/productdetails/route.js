import Product from "@/models/Product";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  try {
    await db();
    const id = req.nextUrl.searchParams.get("id");
    const pro = await Product.findOne({ _id: id });
    return NextResponse.json(
      {
        response: pro,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    await db();
  } catch (error) {
    console.log(error);
  }
}
