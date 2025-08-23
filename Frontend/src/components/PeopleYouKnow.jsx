import React, { useState, useEffect } from 'react'
import People from './People'
import axios from 'axios'
import {useUserContext} from '../Context/UserContext'



const PeopleYouKnow = () => {
  const [people, setPeople] = useState([]);

  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/people-you-know`, {
          withCredentials: true,
      } );

        console.log(response);
        setPeople(response.data.peopleYouKnow);
      } catch (error) {
        console.error('Error fetching people you know:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className='p-4 w-[70%] h-fit bg-white shadow-lg rounded-lg mt-4 mr-[6rem]'>
        <h1 className='text-gray-800 font-semibold'>Suggested Connections</h1>
        <ul className='flex flex-col gap-3 mt-4'>
            {people?.map((person) => (
                <People key={person._id} person={person} />
            ))}
           
        </ul>
    </div>
  )
}

export default PeopleYouKnow