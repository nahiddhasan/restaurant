import Image from 'next/image'
import React from 'react'
import CountDown from '../countdown/CountDown'

const Offer = () => {
  return (
    <div className="h-screen bg-black text-white md:justify-between flex items-center flex-col md:flex-row md:bg-[url('/offerBg.png')] md:h-[70vh]">
        {/* Info Container */}
        <div className='flex-1 flex flex-col items-center justify-center gap-8 p-6 text-center'>
            <h1 className='text-5xl xl:text-6xl font-bold'>Delicious Burger & French Fry</h1>
            <p className='xl:text-xl'>Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.</p>
            <CountDown/>
            <button className='p-2 bg-red-500 text-white rounded-md'>Order Now</button>
        </div>
        {/* Image Container */}
        <div className='relative flex-1 w-full md:h-full'>
            <Image className='object-contain' src="/offerProduct.png" fill alt='' />
        </div>
    </div>
  )
}

export default Offer