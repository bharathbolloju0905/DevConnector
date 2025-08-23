import React from 'react'

const Trending = () => {
  return (
    <div className='p-2 w-[70%] h-fit bg-white shadow-lg rounded-lg mt-4 mr-[6rem]'>
            <h1 className='text-gray-800 font-semibold'>Trending Topics</h1>
            <ul className='flex flex-col gap-2 mt-4'>
              <li className='flex justify-between'><span className='text-[#4C4EE7] font-semibold'>#ReactJS</span> <span>122 posts</span></li>
              <li className='flex justify-between'><span className='text-[#4C4EE7] font-semibold'>#Java</span> <span>108 posts</span></li>
              <li className='flex justify-between'><span className='text-[#4C4EE7] font-semibold'>#JavaScript</span> <span>150 posts</span></li>
              <li className='flex justify-between'><span className='text-[#4C4EE7] font-semibold'>#Python</span> <span>95 posts</span></li>
            </ul>
          </div>
  )
}

export default Trending ;