import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const Menu = async () => {
  const menu = await getData();
  return (
    <div className="p-4 lg:px-20 xl:px-40 flex items-center flex-col md:flex-row h-[calc(100vh-5rem)]">
      {!menu
        ? "nothing found in menu"
        : menu.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu/${cat.slug}`}
              className="w-full p-8 h-1/3 md:h-[60%] bg-cover"
              style={{ backgroundImage: `url(${cat.img})` }}
            >
              <div className={`text-${cat.color} w-1/2`}>
                <h1 className="uppercase font-bold text-3xl">{cat.title}</h1>
                <p className="text-sm my-4">{cat.desc}</p>
                <button
                  className={` hidden xl:block bg-${cat.color} text-${
                    cat.color === "black" ? "white" : "red-500"
                  } py-1 px-4 rounded-md `}
                >
                  Explore
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Menu;
