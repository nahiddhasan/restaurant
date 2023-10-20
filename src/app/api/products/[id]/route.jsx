import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

//get single product
export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const product = await prisma.Product.findUnique({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(product, { status: 201 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ messege: "Something went wrong" }, { status: 500 })
    );
  }
};
