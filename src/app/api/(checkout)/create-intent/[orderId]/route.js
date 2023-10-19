import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req,{params})=>{
    const {orderId} = params;

    const order = await prisma.Order.findUnique({
        where:{
            id:orderId,
        }
    })



    if(order){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: order.price*100,
            currency: "usd",
            automatic_payment_methods: {
              enabled: true,
            },
          });

          await prisma.Order.update({
            where: {
                id: orderId,
            },
            data: {intent_id: paymentIntent.id}
          })

          return new NextResponse(
            JSON.stringify({clientSecret: paymentIntent.client_secret}),{status:200}
          )
    }else{
        return new NextResponse(
            JSON.stringify({messege:"Order not found!"}),{status:404}
          )
    }


}