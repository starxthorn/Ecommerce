import db from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db();
    const { products, totalPrice } = await req.json();
    const id = req.nextUrl.searchParams.get("id");
    const ExistUser = await User.findOne({ _id: id });
    const order = await Order.create({
      products,
      totalPrice,
      user: ExistUser._id,
    });
    ExistUser.orders.push(order);
    await ExistUser.save();
    return NextResponse.json(
      {
        message: "Order placed Successfully",
        response: order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  try {
    await db();
    const orders = await Order.find().populate("user");
    return NextResponse.json(
      {
        response: orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
