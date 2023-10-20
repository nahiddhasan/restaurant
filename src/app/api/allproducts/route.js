import { getAuthSession } from "@/app/utils/auth"
import prisma from "@/app/utils/connect"
import { NextResponse } from "next/server"


//get all product
export const GET = async(req)=>{
    const session = await getAuthSession()
   
    if(session.user.role === "ADMIN"){
        try {
            const products = await prisma.Product.findMany()
            return new NextResponse(JSON.stringify(products,{status:201}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({"messege":"Something went wrong"},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"messege":"You are not Admin"},{status:500}))
    }

}

