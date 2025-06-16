import React from 'react'

const FeedNavigation = () => {
  return (
    <div className=' h-[50px] flex items-center justify-between px-4  w-full bg-white z-10 shadow-lg mt-4 rounded-lg transition duration-300 sticky top-0 '>
        <div className='flex justify-center items-center border-b-2 border-[#4C4EE7] w-1/3 h-full text-[#4C4EE7] py-2'>
            <h2 >Feed</h2>
        </div>
        <div className='flex justify-center items-center border-b-2 border-[#4C4EE7] w-1/3 h-full text-[#4C4EE7] py-2'>
            <h2 >Trending</h2>
        </div>
        <div className='flex justify-center items-center border-b-2 border-[#4C4EE7] w-1/3 h-full text-[#4C4EE7] py-2'>
            <h2 >Followers</h2>
        </div>
    
    </div>
  )
}

export default FeedNavigation