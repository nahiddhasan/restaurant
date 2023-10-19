"use client";

import { removeProduct } from "@/redux/cartRedux";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { products, totalQuantity, totalPrice } = useSelector(
    (state) => state.Cart
  );

  const handleCheckout = async () => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (products.length > 0) {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              products,
              price: totalPrice,
              userEmail: session.user.email,
              status: "Not paid",
              intent_id: "",
            }),
          }
        );
        const data = await res.json();
        router.push(`/payment/${data.id}`);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex gap-4 p-4 text-red-500 flex-col h-[calc(100vh-5rem)] lg:flex-row ">
      {/* Product Container  */}
      <div className="h-1/2 p-4 flex flex-col lg:justify-center overflow-auto   lg:h-full lg:w-1/2 2xl:w-1/2 lg:px-20 xl:px -40">
        {products.length > 0 ? (
          products?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <Image
                className="object-contain"
                src={item.img}
                width={50}
                height={50}
                alt=""
              />
              <div>
                <h1 className="uppercase font-bold text-xl">
                  {item.title} x{item.quantity}
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">${item.price}</h2>
              <span
                className="cursor-pointer"
                onClick={() => dispatch(removeProduct(item))}
              >
                X
              </span>
            </div>
          ))
        ) : (
          <span>No product in your cart</span>
        )}
      </div>
      {/* Payment Container  */}
      <div className="bg-fuchsia-50 h-1/2 p-4 flex flex-col justify-center gap-4 lg:h-full lg:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalQuantity} item)</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delevery Charge</span>
          <span className="text-green-500">Free!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL (INCL. VAT)</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
        <button
          disabled={loading}
          onClick={handleCheckout}
          className={`disabled:bg-red-400 disabled:cursor-not-allowed bg-red-500 text-white rounded-md p-2 w-1/2 self-end`}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
