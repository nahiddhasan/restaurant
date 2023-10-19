"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogOut from "../logout/LogOut";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="relative">
      {!session ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <Image
          onClick={() => setOpen(!open)}
          src={session?.user.image}
          height={25}
          width={25}
          alt="profile"
          className="rounded-full cursor-pointer"
        />
      )}

      {session && open && (
        <div className="absolute w-max -right-2 top-9 z-10 bg-red-100 p-2 px-4 rounded-md flex flex-col gap-1">
          <Link
            className="p-1 bg-red-200 hover:bg-red-300 text-red-500 rounded-md"
            href={"/orders"}
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
          {session.user.role === "ADMIN" && (
            <>
              <Link
                className="p-1 bg-red-200 hover:bg-red-300 text-red-500 rounded-md"
                href={"/add"}
                onClick={() => setOpen(false)}
              >
                Add product
              </Link>
              <Link
                className="p-1 bg-red-200 hover:bg-red-300 text-red-500 rounded-md"
                href={"/allproducts"}
                onClick={() => setOpen(false)}
              >
                All Products
              </Link>
            </>
          )}
          <LogOut />
        </div>
      )}
    </div>
  );
};

export default Profile;
