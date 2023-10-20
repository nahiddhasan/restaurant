import { getAuthSession } from "@/app/utils/auth";
import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

//create new order
export const POST = async (req)=>{
    const session = await getAuthSession();

    if(session){
        try {
            const body =await req.json()
            const order = await prisma.Order.create({
                data:body
            })
            return new NextResponse(JSON.stringify(order,{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))
        }
    }
}

//get user orders
export const GET = async (req)=>{
    const session = await getAuthSession()

    try {
        if(session.user.role === "ADMIN"){
            const orders = await prisma.Order.findMany()
            return new NextResponse(JSON.stringify(orders,{status:200}))

        }
        const orders = await prisma.Order.findMany({
            where:{
                email:session.user.email,
            }
        })
        return new NextResponse(JSON.stringify(orders,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))
        
    }
}