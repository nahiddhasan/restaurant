"use client";

import Loader from "@/components/loader/Loader";
import { useQuery } from "react-query";

const OrdersPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <Loader />;
  }
  const orders = data;
  return (
    <div className="p-4 lg:px-20 xl:px40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left ">
            <th className="hidden md:block">Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((order) => (
            <tr key={order.id} className="text-sm lg:text-base bg-red-50 ">
              <td className="hidden md:block py-4 px-1">{order.id}</td>
              <td className="py-4 px-1">
                {order.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-4 px-1">{order.price}</td>
              <td className="hidden md:block py-4 px-1">
                {order.products.map((product) => (
                  <span key={product.id}>
                    {product.title} ({product.quantity})
                  </span>
                ))}
              </td>
              <td className="py-4 px-1">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
