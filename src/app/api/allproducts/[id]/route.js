import { getAuthSession } from "@/app/utils/auth";
import { NextResponse } from "next/server";


//get single product
export const GET = async(req,{params})=>{
    const session = await getAuthSession()
   const {id} = await params;

    if(session.user.role === "ADMIN"){
        try {
            const product = await prisma.Product.findUnique({
                where:{
                    id:id,
                }
            })
            return new NextResponse(JSON.stringify(product,{status:201}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({"messege":"Something went wrong"},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"messege":"You are not Admin"},{status:500}))
    }

}



//update product
export const PUT = async(req,{params})=>{
    const session = await getAuthSession()
    const {id} = await params;
    const body = await req.json()
    if(session.user.role === "ADMIN"){
        try {
            const updatedProduct = await prisma.Product.update({
                where:{
                    id:id,
                },
                data:body,
            })
            return new NextResponse(JSON.stringify(updatedProduct,{status:201}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({"messege":"Something went wrong"},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"messege":"You are not Admin"},{status:500}))
    }

}


//delete product
export const DELETE = async(req,{params})=>{
    const session = await getAuthSession()
    const {id} = await params;
    if(session.user.role === "ADMIN"){
        try {
             await prisma.Product.delete({
                where:{
                    id:id,
                },
            })
            return new NextResponse(JSON.stringify({"messege":"Product Succesfully removed"},{status:201}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({"messege":"Something went wrong"},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"messege":"You are not Admin"},{status:500}))
    }

}


