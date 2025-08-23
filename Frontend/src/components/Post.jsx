import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { VscHeartFilled } from "react-icons/vsc";
import axios from 'axios'
import { useState } from 'react';
import {useUserContext} from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import useUpdateTiming from '../hooks/Update.Timing'; 

const Post = ({post}) => {
    const {user} = useUserContext();
    const navigate = useNavigate();
    const { changeTimeFormat} = useUpdateTiming() ;

    const [isLiked,setIsliked] = useState(post?.likes?.includes(user?._id) ? true : false);
    const [likes,setLikes] = useState(post?.likes?.length );
 async function handleLike(){
       try{
        setIsliked(!isLiked);
        post.likes = isLiked ? post.likes.filter((id) => id !== user._id) : [...post.likes, user._id];
        setLikes(post.likes.length);
         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/like/${post._id}`, {
            method: 'POST',
            withCredentials: true,
        });
        console.log(response.data);
        setLikes(response.data.post?.likes?.length );
       }
catch(err){
    console.log("Error while like: ",err)
}
    }

    const handleWatchProfile = () => {
        
      navigate(`/profiles/${post?.userId?._id}`);
    };

  return (
    <div className='w-full h-[600px] bg-white shadow-lg rounded-lg p-4 mt-4'>
        <div className='flex items-center justify-start gap-4 cursor-pointer' onClick={handleWatchProfile}>
            <div>
                <img className='h-10 w-10 rounded-full' src={`${import.meta.env.VITE_BASE_URL}${post?.userId?.profilepic}`} alt="" />
            </div>
            <div>
                <h1 className='text-md font-semibold'>{post?.userId?.fullname}</h1>
                <p className='text-[12px]'>{post?.userId?.profession}. {changeTimeFormat(post?.createdAt)}</p>
            </div>
        </div>
            <div > 
                <p className='text-ellipsis w-full overflow-hidden text-sm'>{post?.description}</p>
            </div>
        <div className='h-[300px] md:h-[350px] w-[90%] '>
            <img className='h-full w-full rounded-md m-2 object-fit' src={`${import.meta.env.VITE_BASE_URL}${post?.image}`} alt="" />
        </div>
        <div className='flex items-center gap-4 w-full h-12 mt-4'>
            <div> {isLiked? <VscHeartFilled className='h-[20px] w-[20px] cursor-pointer text-red-800' onClick={handleLike}></VscHeartFilled>:<FaRegHeart className='h-[20px] w-[20px] cursor-pointer' onClick={handleLike}></FaRegHeart> } {likes} Likes</div> <div> <FiMessageCircle  className='h-[20px] w-[20px] cursor-pointer'></FiMessageCircle> Comments</div>
        </div>
    </div>
  )
}

export default Post