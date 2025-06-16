import React from 'react'
import { useUserContext } from '../Context/UserContext'
const CreatePost = ({setcreatepost,createpost}) => {
  const { user } = useUserContext();
  return (
    <div className='  w-full flex items-center justify-between px-4  bg-white shadow-lg mt-4 rounded-lg p-2 gap-4'> 
        <div>
            <img className='h-10 w-10 rounded-full mr-2' src={`${import.meta.env.VITE_BASE_URL}${user?.profilepic}`} alt="oogway" />
        </div>
        <div className='w-full h-full flex items-center justify-center'>
            <input type="text" className='w-full text-lg pl-[2rem] border-1 border-gray-50 rounded-md text-gray-800 focus:border-purple-500 bg-gray-200 ' placeholder='What is on your mind ?'onClick={()=>setcreatepost(!createpost)}/>
        </div>
    </div>
  )
}

export default CreatePost