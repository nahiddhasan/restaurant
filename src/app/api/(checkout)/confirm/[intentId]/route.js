import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req,{params})=>{
    const {intentId } = params;

   try {
     await prisma.Order.update({
        where:{
         intent_id:intentId,
        },
        data: { status: "Processing!" },
     })

     return new NextResponse(
        JSON.stringify({messege:"Order has been updated"},{status:200})
     )
   } catch (error) {
    console.log(error)
    return new NextResponse(
        JSON.stringify({messege:"Something went Wrong"},{status:500})
     )
   }
}