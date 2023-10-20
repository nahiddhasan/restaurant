"use client";

import { debounce } from "debounce";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [items, setItems] = useState([]);

  const handleSearch = async (searchInput) => {
    if (searchInput == "") {
      setItems([]);
      return;
    }

    setSearching(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${searchInput}`
      );
      const result = await response.json();

      if (result) {
        setItems(result);
        setSearching(false);
        return;
      }
      setItems([]);
      setSearching(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    debounce(handleSearch(searchInput), 500);
  }, [searchInput]);
  return (
    <div className="relative w-[300px]">
      <div className="rounded-sm p-2 py-1 ring-1 ring-red-500 flex justify-between items-center">
        <BiSearch className="text-xl mr-2" />
        <input
          className="border-none outline-none placeholder:text-red-300"
          type="text"
          value={searchInput}
          placeholder="Search Products"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="absolute top-14 z-10 flex flex-col gap-2 w-full">
        {searching
          ? "Loading..."
          : items.map((item) => (
              <Link
                onClick={() => setSearchInput("")}
                href={`/product/${item.id}`}
                key={item.id}
                className="w-full ring-1 ring-red-500 rounded-sm px-2 py-1 flex items-center justify-between bg-white  hover:bg-gray-200"
              >
                <div className="flex items-center">
                  <Image
                    src={item.img}
                    height={35}
                    width={35}
                    alt={item.title}
                    className="object-contain"
                  />
                  <span>{item.title}</span>
                </div>
                <div className="truncate">${item.price}</div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Search;
