"use client";

import { addProduct } from "@/redux/cartRedux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Price = ({ product }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(
      quantity *
        (product.options
          ? product.price + product.options[selected].additionalPrice
          : product.price)
    );
  }, [quantity, selected, product.options, product.price]);

  const handleClick = () => {
    dispatch(
      addProduct({
        id: product.id,
        title: product.title,
        img: product.img,
        price: total,
        ...(product.options?.length && {
          optionTitle: product.options[selected].title,
        }),
        quantity: quantity,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Price */}
      <h2 className="text-2xl font-bold">${total}</h2>
      {/* Option Container */}
      <div className="flex gap-4 flex-wrap">
        {product.options.map((option, index) => (
          <button
            key={index}
            className="p-2 min-w-[6rem] ring-1 ring-red-500 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* Qty add Container */}
      <div className="w-full flex justify-between items-center p-3 ring-1 ring-red-500">
        <span>Quantity</span>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            {"<"}
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
          >
            {">"}
          </button>
        </div>
      </div>
      {/* Add to cart Button  */}
      <button
        className="w-1/2 p-2 uppercase bg-red-500 text-white"
        onClick={handleClick}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Price;
