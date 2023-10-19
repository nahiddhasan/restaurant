import { getAuthSession } from "@/app/utils/auth";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "../cartIcon/CartIcon";
import MobileMenu from "../mobileMenu/MobileMenu";
import Profile from "../profile/Profile";
import Search from "../search/Search";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="h-12 p-4 text-red-500 flex items-center justify-between border-b-[1px] border-b-red-500 uppercase">
      {/* Left item */}
      <div className=" hidden md:flex items-center gap-4 flex-1">
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/menu" className="">
          Menu
        </Link>
        <Link href="/contact" className="">
          Contact
        </Link>
        {/* search  */}
        <Search />
      </div>

      {/* Logo */}
      <div className=" flex-1 md:font-bold md:text-center">
        <Link href="/">Massimo</Link>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
      {/* Right item */}
      <div className=" flex-1 hidden md:flex items-center gap-4 justify-end  ">
        <div className="flex items-center gap-2 bg-orange-300 rounded-md px-2 cursor-pointer md:absolute top-1 right-2 lg:static">
          <Image src="/phone.png" height={20} width={20} alt="" />
          <span>123 456 78</span>
        </div>

        <Profile />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
