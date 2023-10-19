"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const data = [
    {
      id: 1,
      title: "always fresh & always crispy & always hot",
      image: "/slide1.png",
    },
    {
      id: 2,
      title: "we deliver your order wherever you are in NY",
      image: "/slide2.png",
    },
    {
      id: 3,
      title: "the best pizza to share with your family",
      image: "/slide3.jpg",
    },
  ];

const Slider = () => {

    const [currentSlide,setCurrentSlide] = useState(0)

    useEffect(()=>{
        const interval = setInterval(
            ()=>setCurrentSlide((prev)=>(prev === data.length - 1 ? 0 : prev + 1)),4000
        )
        return ()=>clearInterval(interval)
    },[]);


   
  return (
    <div className='flex flex-col h-[calc(100vh-5rem)] bg-fuchsia-50 lg:gap-4 lg:flex-row '>
    {/* Text Container */}
    <div className='flex-1 p-8 text-red-500 flex items-center justify-center flex-col font-bold'>
        <h1 className='uppercase p-4 text-center text-4xl md:p-10   md:text-6xl xl:text-7xl '>{data[currentSlide].title}</h1>
        <button className='bg-red-500 py-4 px-8 text-white rounded-md'>Order Now</button>
    </div>
    {/* Image Container */}
    <div className='w-full flex-1 relative '>
        <Image className='object-cover' src={data[currentSlide].image} fill alt='' />
    </div>

    </div>
  )
}

export default Slider