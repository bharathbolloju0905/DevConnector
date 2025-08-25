import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast  from 'react-hot-toast';

const NavBar = ({ setPosts, posts, fetchPosts }) => {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  useEffect(() => {


    const getUnreadNotifications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/messages/unread-count`, {
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error('Failed to fetch unread notifications');
        }
        const data = response.data;
        console.log('Unread notifications:', data);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    getUnreadNotifications();
  }, [user]);

  function handleChange(e) {
    const value = e.target.value;
    setInput(value);
    if (value.length === 0) {
 
      fetchPosts(); 
      return;
    }

    if (value.length > 3) {
      const filtered = posts.filter((post) => {
        return (
          post.description.toLowerCase().includes(value.toLowerCase()) ||
          post.userId.fullname.toLowerCase().includes(value.toLowerCase())
        );
      });
    
      setPosts(filtered); 
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/api/logout`,{
        withCredentials: true,
      });
      navigate('/login'); 
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };  
  return (
    <div className='w-full md:h-14 h-12 flex items-center justify-between p-2 md:px-4 fixed bg-white z-10 shadow-md '>
      <div>
        <h1 className="text-[#4C4EE7] text-sm md:text-xl lg:text-2xl font-bold">
          <span className='text-sm md:text-xl lg:text-2xl font-bold'>&lt;</span>DevConnector/<span className='text-sm md:text-xl lg:text-2xl font-bold'>&gt;</span>
        </h1>
      </div>

      <div className='relative w-[55%] md:w-1/3 h-full'>
        <CiSearch className='absolute text-gray-500  left-0 h-6 w-6 top-[12%]  font-bold' />
        <input
          className='w-full h-full md:text-lg md:pl-[3rem] lg:pl-[30px] lg:text-[16px] pl-[2rem] text-xs border border-black rounded-md text-gray-800 focus:border-purple-500'
          type="text"
          placeholder='Search for post , friends or topics...'
          value={input}
          onChange={handleChange}

        />
      </div>

      <div className="flex justify-center items-center md:gap-3 gap-[1px]">
        <FaBell className='text-gray-500 h-[15px] w-[15px] md:h-[20px] md:w-[20px] font-bold' />


        <div >
          <img className='md:h-[30px] md:w-[30px] w-[20px] h-[20px] rounded-full' src={`${user?.profilepic}`}
            alt="user" />
        </div>
        <div className='flex '>
          <h1 className='text-gray-800 font-semibold text-md hidden md:flex lg:flex'>{user?.fullname}</h1>
          <IoIosArrowDown className='text-gray-500 md:h-[25px] md:w-[25px] h-[20px] w-[20px] font-bold cursor-pointer z-auto' onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      <div className={`absolute right-[5rem] z-11 top-[4rem] bg-white shadow-lg rounded-md p-1 w-40 group-hover:block ${isOpen ? 'block' : 'hidden'}`}>
        <ul className='flex flex-col gap-2 w-full justify-center'>
          <li className='hover:bg-gray-100 w-full m-1'><Link to='/profile'>Your Profile</Link></li>
          <li className='hover:bg-gray-100 w-full m-1'><Link to='/profile'>Settings</Link></li>
          <li className='hover:bg-gray-100 w-full m-1' onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div >


  );
}
export default NavBar
