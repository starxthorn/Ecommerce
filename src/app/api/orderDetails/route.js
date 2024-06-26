import Order from "@/models/Order";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
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

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await db();
    await Order.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Order deleted",
    });
  } catch (error) {
    console.log(error);
  }
}
