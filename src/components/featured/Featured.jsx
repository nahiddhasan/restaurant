import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};
const Featured = async () => {
  const featuredProducts = await getData();

  return (
    <div className="w-screen overflow-x-scroll overflow-y-hidden text-red-500">
      {/* Wrapper */}
      <div className="w-max flex">
        {/* Single Item */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="h-[60vh] w-screen flex gap-4 flex-col p-4 items-center justify-around hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* Image Container */}

            <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-300">
              <Image src={item.img} fill alt="" className="object-contain" />
            </div>

            {/* Info Container */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="uppercase text-xl font-bold xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">{item.price}</span>
              <Link
                href={`/product/${item.id}`}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
