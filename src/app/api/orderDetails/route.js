import Order from "@/models/Order";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await db();
    const id = req.nextUrl.searchParams.get("id");
    const order = await Order.findOne({ _id: id })
      .populate("products.productId")
      .populate("user");
    return NextResponse.json({
      response: order,
    });
  } catch (error) {
    console.log(error);
  }
}
