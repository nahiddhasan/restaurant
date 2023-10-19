"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const { data: session } = useSession();
  const { totalQuantity } = useSelector((state) => state.Cart);

  return (
    <Link href={"/cart"}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative w-8 h-8 md:w-5 md:h-5">
            <Image
              src="/cart.png"
              alt=""
              fill
              sizes="100%"
              className="object-contain"
            />
          </div>
          <span className="absolute flex items-center justify-center top-0 -right-2 bg-red-500 text-white rounded-full text-xs font-bold h-4 w-4 z-10">
            {totalQuantity}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CartIcon;
