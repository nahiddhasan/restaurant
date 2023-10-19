"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="p-4 h-[calc(100vh-5rem)] flex items-center justify-center">
      {/* Box  */}
      <div className="h-full shadow-2xl p-4 rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* Image Contianer  */}

        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" fill alt="" className="object-cover" />
        </div>
        {/* Form Container  */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button className="shadow-sm flex items-center gap-4 p-4 ring-1 ring-orange-100 rounded-md">
            <Image src="/google.png" height={20} width={20} alt="" />
            <span onClick={() => signIn("google")}>Sign in With Google</span>
          </button>

          <button className="shadow-sm flex items-center gap-4 p-4 ring-1 ring-orange-100 rounded-md">
            <Image src="/facebook.png" height={20} width={20} alt="" />
            <span>Sign in With facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
