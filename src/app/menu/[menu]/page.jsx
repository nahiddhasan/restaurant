import Image from "next/image";
import Link from "next/link";

const getData = async (menu) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?menu=${menu}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const CategoryPage = async ({ params }) => {
  const { menu } = params;
  const products = await getData(menu);
  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="w-full h-[60vh] border-b-2 border-r-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col items-center justify-between odd:bg-fuchsia-50 group"
        >
          {/* Image Container */}
          <div className="relative h-[80%] w-full">
            <Image src={item.img} fill alt="" className="object-contain" />
          </div>
          {/* Text Container */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block p-2 uppercase bg-red-500 text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
