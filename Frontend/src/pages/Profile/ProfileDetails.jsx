
import React, {useState}from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import { FaGithub } from "react-icons/fa6";
import { PiHandbagFill } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import {useUserContext} from "../../context/UserContext";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext";

const ProfileDetails = () => {
    const location = useLocation();
    const { person } = location.state || {};
const [isConnected, setIsConnected] = useState(false);
    const { user } = useUserContext();
    const { socket, sendMessage, receiveMessage } = useSocketContext();
    const navigate = useNavigate()
    function handleMessage(){
        navigate(`/messages/${person?._id}`,{
            state:{person}
        })
    }
   async function handleConnect(){
       try {
        const userId = user?._id;
        if( !userId) {
            console.error("User ID is not available");
            return;
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/connections/connect`, {
            personId: person?._id,
        },
        {
            withCredentials: true
        });
        if (res.status === 201) {
            setIsConnected(true);
            console.log("Connection successful");
            // Emit a socket event to notify the other user
            sendMessage("newConnection", {
                from: userId,
                to: person?._id,
                message: `${user?.fullname} has connected with you!`
            });
        }
        
       } catch (error) {
        console.error("Error connecting:", error);
        
       }
    }
  
  return (
     <div className="flex flex-col w-fulll h-screen ">
          <Link to="/home"><FaArrowLeftLong className="bg-[#4C4EE7] text-white rounded-full h-8 w-8 absolute top-4 left-4 p-2" /></Link>
   
          <div className="w-full h-[40%] bg-[#3b3fd9] flex items-end justify-center p-10  pb-3">
            <img
              className="h-32 w-32 rounded-full"
              src={`${import.meta.env.VITE_BASE_URL}${person?.profilepic}`}
              alt="profile img"
            />
            <div className="w-full flex justify-between">
              <div className="ml-4 w-full">
                <h1 className="text-white font-semibold text-2xl">{person?.fullname}</h1>
                <div className="flex gap-4 mt-2 w-full justify-between">
                  <div>
                    <p className="text-white text-lg">{person?.profession}</p>
                    <p className="text-white flex justify-center items-center text-sm"> <FaLocationDot className="h-4 w-4 mr-1" /> {person?.contact.address}</p>
                  </div>
                  <div>
                    <button className="bg-[#0fcaffa8] text-white   font-medium px-4 py-2 rounded-md mt-4 mr-4 hover:bg-[#0fcaffc3] transition duration-300 cursor-pointer text-md" disabled={isConnected} onClick={handleConnect}>{isConnected ? "Connected" : "Connect"}</button>
                    <button className="bg-white text-[#4C4EE7] font-medium px-4 py-2 rounded-md mt-4 hover:bg-gray-200 transition duration-300 cursor-pointer text-md" onClick={handleMessage}>Message</button>
                  </div>
                </div>
              </div>
    
            </div>
    
          </div>
          <div className="w-full flex items-center justify-center p-10 mt-4 g-3">
            <div className="w-[30%] flex flex-col gap-3 items-center justify-start h-full">
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">About</h1>
                <p className="text-gray-500 text-[14px] mt-2">{person?.bio}</p>
              </div>
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">Skills</h1>
                <div>
                  <ul className="flex  gap-2 mt-2 flex-wrap">
                    <li className="text-[#5b2f8d] text-[10px] font-semibold p-2 bg-[#c4b4d8] rounded-lg">HTML</li>
                    <li className="text-[#5b2f8d] text-[10px] font-semibold p-2 rounded-lg bg-[#c4b4d8]">CSS</li>
                    {
                      person?.skills?.map((skill, index) => (
                        <li key={index} className="text-[#5b2f8d] text-[10px] font-semibold p-2 bg-[#c4b4d8] rounded-lg">{skill}</li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              {/* Contact detaila */}
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">Contact</h1>
                <div className="flex flex-col gap-2 mt-2">
                  <div>
                    <p className="text-gray-500 text-[14px] flex items-center gap-2"><MdOutlineMailOutline className="h-5 w-5" /> <span className="text-gray-500 text-[14px]"> {person?.email}</span> </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[14px] flex items-center gap-2"><SlGlobe className="h-5 w-5" /> <span className="text-gray-500 text-[14px]"> www.{person?.contact.website} </span> </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[14px] flex items-center gap-2"><FaGithub className="h-5 w-5" /> <span className="text-gray-500 text-[14px]">{person?.contact.github} </span> </p>
                  </div>
                </div>
              </div>
    
            </div>
    
            <div className="w-[60%] gap-3 flex flex-col justify-start items-center ml-4 h-full ">
              {/* Experience */}
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">Experience</h1>
                {
                  person?.experience.map((exp, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <div className="p-3 bg-[#c4b4d8] rounded-full w-[40px] h-fit mt-2 inline-flex items-center justify-center">
                        <  PiHandbagFill className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <h1 className="text-gray-800 font-semibold text-lg">{exp.company}</h1>
                        <p className="text-gray-500 text-[14px]">{exp.startdate}-{exp.enddate}</p>
                        <p className="text-gray-500 text-[14px]">{exp.role}</p>
                      </div>
                    </div>
                  ))
                }
                <div className="flex gap-2 mt-2">
                  <div className="p-3 bg-[#c4b4d8] rounded-full w-[40px] h-fit mt-2 inline-flex items-center justify-center">
                    <  PiHandbagFill className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <h1 className="text-gray-800 font-semibold text-lg">Full Stack Developer</h1>
                    <p className="text-gray-500 text-[14px]">Aug 2024 - Feb-2025</p>
                    <p className="text-gray-500 text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.</p>
                  </div>
                </div>
    
              </div>
              {/* Education */}
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4 mt-4">
                <h1 className="text-gray-800 font-semibold text-xl">Education</h1>
                {
                  person?.education.map((edu, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <div className="p-3 bg-[#c4b4d8] rounded-full w-[40px] h-fit mt-2 inline-flex items-center justify-center">
                        <  FaGraduationCap className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <h1 className="text-gray-800 font-semibold text-lg">{edu.class}</h1>
                        <p className="text-gray-500 text-[14px]">{edu.nameofCollege}</p>
                        <p className="text-gray-500 text-[14px]">{edu.startdate}-{edu.enddate}</p>
                      </div>
                    </div>
                  ))
                }
                <div className="flex gap-2 mt-2">
                  <div className="p-3 bg-[#c4b4d8] rounded-full w-[40px] h-fit mt-2 inline-flex items-center justify-center">
                    <  FaGraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <h1 className="text-gray-800 font-semibold text-lg">Bacholor of Technology</h1>
                    <p className="text-gray-500 text-[14px]">JNTU Hyderabad</p>
                    <p className="text-gray-500 text-[14px]">Aug 2024 - Feb-2025</p>
                  </div>
                </div>
              </div>
    
              {/* Projects  or Posts */}
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4 mt-4">
                <h1 className="text-gray-800 font-semibold text-xl">Post</h1>
                <div className="flex flex-wrap w-full gap-4 mt-2">
                  {
                    person?.posts?.map((post, index) => (
                      <div className='w-[45%]  bg-white shadow-lg rounded-lg p-4' key={index}>
                        <img className="w-full rounded-lg" src={`${import.meta.env.VITE_BASE_URL}${post?.image}`} alt="project img" />
                        <h1 className="text-gray-800 font-semibold text-lg">Post 1</h1>
                        <p className="text-gray-500 text-[14px]">{post.description}</p>
                        <p className="text-gray-800 text-[14px] font-semibold "> <span>{post?.likes?.length} likes</span> <span>{post?.comments?.length} comments</span> </p>
                      </div> ))
                  }
                  {/* <div className='w-[45%]  bg-white shadow-lg rounded-lg p-4'>
                    <img className="w-full rounded-lg" src="https://sailingwithmasters.com/wp-content/uploads/2020/07/kung-fu-panda-oogway-prophecy.jpg?w=640" alt="project img" />
                    <h1 className="text-gray-800 font-semibold text-lg">Post 1</h1>
                    <p className="text-gray-500 text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</p>
                    <p className="text-gray-800 text-[14px] font-semibold "> <span>200 likes</span> <span>134 comments</span> </p>
                  </div>
                  <div className='w-[45%]  bg-white shadow-lg rounded-lg p-4'>
                    <img className="w-full rounded-lg" src="https://sailingwithmasters.com/wp-content/uploads/2020/07/kung-fu-panda-oogway-prophecy.jpg?w=640" alt="project img" />
                    <h1 className="text-gray-800 font-semibold text-lg">Post 1</h1>
                    <p className="text-gray-500 text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</p>
                    <p className="text-gray-800 text-[14px] font-semibold "> <span>200 likes</span> <span>134 comments</span> </p>
                  </div>  duplicate data*/}
                </div>
              </div>
            </div>
          </div>
    
        </div >
   
  )
}

export default ProfileDetails