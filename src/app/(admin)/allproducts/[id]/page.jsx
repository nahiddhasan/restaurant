"use client";

import upload from "@/app/utils/upload";
import Loader from "@/components/loader/Loader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const UpdateProduct = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    isLoading: isLoading2,
    error: err,
    data: productData,
  } = useQuery({
    queryKey: ["updateProduct"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts/${id}`).then(
        (res) => res.json()
      ),
  });

  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
  });
  const [menuSlug, setMenu] = useState();
  const [price, setPrice] = useState(0);
  const [option, setOption] = useState({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState([]);
  const [file, setFile] = useState();
  const [isFeatured, setIsFeatured] = useState(true);

  const { isLoading, error, data } = useQuery({
    queryKey: ["menu"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`).then((res) =>
        res.json()
      ),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["updateProduct"] });
    },
  });

  if (isLoading || status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated" || !session?.user.role === "ADMIN") {
    router.push("/");
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (e) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    mutation.mutate({
      img: url,
      ...inputs,
      price: parseFloat(price),
      menuSlug,
      options,
      isFeatured,
    });
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40  flex items-center justify-center text-red-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Update Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/open.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            required
            onChange={(e) => setFile(e.target.files[0])}
            id="file"
            className="hidden"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="29"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Menu</label>

          <select
            name=""
            id=""
            onChange={(e) => setMenu(e.target.value)}
            required
            className="capitalize ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none bg-transparent w-max"
          >
            {data.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.slug}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex">
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeOption}
            />
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button
              type="button"
              className="bg-gray-500 p-2 text-white"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
          </div>
          <div>
            <span className="mr-4">isFeatured</span>
            <select
              onChange={(e) => setIsFeatured(e.target.value)}
              name=""
              id=""
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none bg-transparent w-max"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
