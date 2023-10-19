import { getAuthSession } from "@/app/utils/auth"
import prisma from "@/app/utils/connect"
import { NextResponse } from "next/server"

//getting all menu
export const GET =async(req)=>{

    try {
        const menu = await prisma.Menu.findMany()
        return new NextResponse(JSON.stringify(menu,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:200}))
    }
}


//create new menu
export const POST =async(NextRequest)=> {
    const session = await getAuthSession();

    if(session.user.role === "ADMIN"){

        try {
            const body = await NextRequest.json();
            const menu = await prisma.Menu.create({
                data:body,
            })
            return new NextResponse(JSON.stringify(menu,{status:201}))
        } catch (error) {
          return new NextResponse(JSON.stringify({"message": `something went wrong ${error}`},{status:500}))
        }
    }else{
        return new NextResponse(JSON.stringify({"message": "You are not alowed to do that"},{status:500}))
    }
}
