import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../Context/UserContext'
const SideProfile = () => {
  const { user } = useUserContext();
  return (
    <div className='flex flex-col items-center justify-start w-[75%] h-fit bg-white shadow-lg rounded-lg p-4 mt-4 ml-[6rem]'>
      <div>
        <img className='h-[70px] w-[70px] rounded-full' src={user?.profilepic} alt="profile img" />
      </div>
      <div className='flex flex-col items-center justify-center mt-4'>
        <h1 className='text-gray-800 font-semibold'>{user?.fullname}</h1>
        <p className='text-gray-500'>{user?.profession}</p>
      </div>

      <div className='flex gap-4 w-full justify-center border-t-2 border-gray-200 mt-2'>
        <div className='flex flex-col items-center justify-center mt-2'>
          <h1 className='text-lg font-semibold'>{user?.posts.length}</h1>
          <p className='text-md text-gray-900 '>Posts</p>
        </div>
        <div className='flex flex-col items-center justify-center mt-2'>
          <h1 className='text-lg font-semibold'>{user?.followers.length}</h1>
          <p className='text-md text-gray-900 '>Followers</p>
        </div>
        <div className='flex flex-col items-center justify-center mt-2'>
          <h1 className='text-lg font-semibold'>{user?.following.length}</h1>
          <p className='text-md text-gray-900 '>Following</p>
        </div>
      </div>
        <div className='border-t-2 border-gray-200 w-full mt-4 flex flex-col items-center justify-center'>
          <button className='bg-[#4C4EE7] text-white font-medium px-4 py-2 rounded-md mt-4 hover:bg-[#3b3fd9] transition duration-300 cursor-pointer text-md'><Link to="/profile">Edit Profile</Link></button>
      </div>
    </div>
  )
}

export default SideProfile