import Product from "@/models/Product";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    await db();
    const {
      title,
      description,
      oldPrice,
      newPrice,
      stock,
      category,
      images,
      featured,
    } = await req.json();
    const pro = await Product.create({
      title,
      description,
      oldPrice,
      newPrice,
      stock,
      category,
      images,
      featured,
    });
    return NextResponse.json(
      {
        message: "Product Created",
        response: pro,
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
    const pro = await Product.find();
    return NextResponse.json(
      {
        response: pro,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
    let pro = await Product.findByIdAndUpdate(id, await req.json(), {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return NextResponse.json(
      {
        message: "Product Updated",
        response: pro,
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
    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Product Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
