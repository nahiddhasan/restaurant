"use client";

import Loader from "@/components/loader/Loader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "react-query";

const Products = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [modal, setModal] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (status === "unauthenticated" || !session?.user.role === "ADMIN") {
    router.push("/");
  }

  const handleRemove = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts/${id}`, {
      method: "DELETE",
    });
    console.log("Remove Successful");
  };
  const products = data;
  return (
    <>
      <div className="p-4">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="text-left ">
              <th>Product Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Is Featured</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products &&
              products?.map((product) => (
                <tr
                  key={product.id}
                  className={`text-sm lg:text-base dark:bg-menu bg-slate-200 w-max `}
                >
                  <td className="p-2">{product.id}</td>
                  <td className="p-2">
                    <Image
                      src={product.img}
                      width={60}
                      height={35}
                      alt="product"
                    />
                  </td>
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.isFeatured ? "Yes" : "No"}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Link href={`/allproducts/${product.id}`}>
                        <FaEdit className="text-lg text-green-500" />
                      </Link>
                      <button onClick={() => setModal(true)}>
                        <MdDelete className="text-lg text-rose-500" />
                      </button>
                    </div>
                    {modal && (
                      <div
                        onClick={() => setModal(false)}
                        className="flex items-center justify-center h-screen w-screen bg-black/20 absolute top-0 left-0"
                      >
                        <div className="w-[300px] h-[150px] bg-white rounded-md flex items-center justify-center gap-2">
                          <button
                            onClick={() => setModal(false)}
                            className="bg-red-500 hover:bg-red-400 px-4 py-1 text-white rounded-md"
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="bg-green-500 hover:bg-green-400 px-4 py-1 text-white rounded-md"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
