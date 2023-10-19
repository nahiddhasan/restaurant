import { getAuthSession } from "@/app/utils/auth";
import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";


//create new product
export const POST =async(req)=> {
    const session = await getAuthSession();

    if(session.user.role === "ADMIN"){

        try {
            const body = await req.json();
            const product = await prisma.Product.create({
                data:body,
            })
            return new NextResponse(JSON.stringify(product,{status:201}))
        } catch (error) {
          return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"message": "Only admin can add a product"},{status:500}))
    }
}


//get all product
export const GET = async(req)=>{
    const {searchParams} = new URL(req.url)
    const menu = searchParams.get("menu")
    const search = searchParams.get("search")
    const filters = {
        ...(menu && { menuSlug:menu}),
        ...(search && { title: {contains: search,mode:"insensitive"} }),
        ...({isFeatured:true})
      };

    try {

        const products = await prisma.Product.findMany({
            where:filters,
        })
        return new NextResponse(JSON.stringify(products,{status:201}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({"messege":"Something went wrong"},{status:500}))
    }
}



