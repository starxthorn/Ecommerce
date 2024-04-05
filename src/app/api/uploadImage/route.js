import { NextResponse } from "next/server";

export async function POST(req) {
  const formdata = await req.formData();
  const image = formdata.get("image");

  console.log(image);

  return NextResponse.json(
    {
      response: image,
    },
    { status: 200 }
  );
}
