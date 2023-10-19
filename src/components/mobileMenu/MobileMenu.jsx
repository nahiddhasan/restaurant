"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "../cartIcon/CartIcon";
import LogOut from "../logout/LogOut";
const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];
const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <Image
        src={open ? "/close.png" : "/open.png"}
        height={20}
        width={20}
        alt=""
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />

      {open && (
        <div className="absolute top-[5rem] left-0 h-[calc(100vh-5rem)] bg-red-500 text-white flex items-center justify-center flex-col w-full gap-6 text-2xl z-10">
          {links.map((item) => (
            <Link key={item.id} href={item.url} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          <Link href={session ? "/orders" : "/login"}>
            {session ? "Orders" : "Login"}
          </Link>
          {session && (
            <>
              <LogOut />
              <Image
                src={session?.user.image}
                height={50}
                width={50}
                alt="profile"
                className="rounded-full cursor-pointer"
              />
            </>
          )}
          <CartIcon onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
