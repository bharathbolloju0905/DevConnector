import React from 'react'
import { TiUserAdd } from "react-icons/ti";
import {useNavigate} from "react-router-dom"


const People = ({person}) => {
    const navigate = useNavigate();
    function handleClick(){
        // Handle the click event, e.g., send a friend request or open a profile
        console.log(person)
        console.log(`Clicked on ${person?.fullname}'s profile and id is: ${person?._id}`);
        navigate(`/profiles/${person?._id}`, { state: { person: person } });
        
        // You can add more functionality here, like navigating to their profile or sending a friend request
    }
    return (
        <li className='flex justify-between items-center pt-1.5 cursor-pointer' onClick={handleClick}>
            <div className='flex items-center gap-2'>
                <img className='h-10 w-10 rounded-full' src={`${import.meta.env.VITE_BASE_URL}${person?.profilepic}`} alt="profile img" />
               <div>
                    <h1 className='text-gray-800 font-semibold'>{person?.fullname}</h1>
                    <p className='text-gray-500 text-xs'>{person?.profession}</p>
            
               </div>
            </div>
           <TiUserAdd className='w-[20px] h-[20px] cursor-pointer text-[#4C4EE7]'/>
        </li>
    )
}

export default People