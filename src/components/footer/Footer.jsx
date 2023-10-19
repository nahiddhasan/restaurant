import Link from "next/link";
import React from "react";

const Footer = () => {
  return <div className="text-red-600 h-12 flex justify-between p-4 items-center ">
    <Link href="/" className="font-bold">MASSIMO</Link>
    <p>© ALL RIGHTS RESERVED.</p>
  </div>;
};

export default Footer;
