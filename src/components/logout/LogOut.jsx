"use client";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <div
      className="cursor-pointer p-1 hover:bg-red-200 text-red-500 rounded-md"
      onClick={() => signOut()}
    >
      LogOut
    </div>
  );
};

export default LogOut;
