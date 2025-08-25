
import React, {useEffect, useState}from "react";
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
import {useUserContext} from "../../Context/UserContext";
import axios from "axios";
import { useSocketContext } from "../../Context/SocketContext";
import {useParams} from "react-router-dom"

const ProfileDetails = () => {
    const location = useLocation();
    const { person } = location.state || {};
    const [profile,setProfile] = useState(person);
const [isConnected, setIsConnected] = useState(false);
    const { user } = useUserContext();
      const userId = useParams();
    const { socket, sendMessage, receiveMessage } = useSocketContext();
    const navigate = useNavigate()
    function handleMessage(){
        navigate(`/messages/${profile?._id}`,{
            state:{profile}
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
            personId: profile?._id,
        },
        {
            withCredentials: true
        });
        if (res.status === 201) {
            setIsConnected(true);
            console.log("Connection successful");
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
 
    useEffect(() => {
      const fetchTheProfileDetails = async () => {
        try {
   
          console.log("The User Id",userId.userId);
          
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/${userId.userId}`, {
            withCredentials: true
          });
          console.log("fectched Profile details:",res.data.user);
          setProfile(res.data.user);
          if (res.status === 200) {
            console.log("Profile details fetched successfully");
          }
          if(user.following.includes(userId.userId)){
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      }

      fetchTheProfileDetails();
    }, []);


  return (
     <div className="flex flex-col w-fulll h-screen ">
          <Link to="/home"><FaArrowLeftLong className="bg-[#4C4EE7] text-white rounded-full h-8 w-8 absolute top-4 left-4 p-2" /></Link>
   
          <div className="w-full h-fit md:h-[40%] bg-[#3b3fd9] flex flex-col items-center md:flex-row md:items-end justify-center p-10  pb-3">
            <img
              className="h-32 w-32 rounded-full"
              src={`${profile?.profilepic}`}
              alt="profile img"
            />
            <div className="w-full flex flex-col  md:justify-between">
              <div className="ml-4 w-full flex flex-col items-center md:items-start">
                <h1 className="text-white font-semibold text-2xl">{profile?.fullname}</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 mt-2 w-full md:justify-between">
                  <div>
                    <p className="text-white text-lg">{profile?.profession}</p>
                    <p className="text-white flex justify-center items-center text-sm"> <FaLocationDot className="h-4 w-4 mr-1" /> {profile?.contact.address}</p>
                  </div>
                  <div>
                    <button className="bg-[#0fcaffa8] text-white   font-medium px-4 py-2 rounded-md mt-4 mr-4 hover:bg-[#0fcaffc3] transition duration-300 cursor-pointer text-md" disabled={isConnected} onClick={handleConnect}>{isConnected ? "Connected" : "Connect"}</button>
                    <button className="bg-white text-[#4C4EE7] font-medium px-4 py-2 rounded-md mt-4 hover:bg-gray-200 transition duration-300 cursor-pointer text-md" onClick={handleMessage}>Message</button>
                  </div>
                </div>
              </div>
    
            </div>
    
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center p-5 md:p-10 mt-4 g-3">
            <div className="w-full md:w-[30%] flex flex-col gap-3 items-center justify-start h-full">
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">About</h1>
                <p className="text-gray-500 text-[14px] mt-2">{profile?.bio}</p>
              </div>
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">Skills</h1>
                <div>
                  <ul className="flex  gap-2 mt-2 flex-wrap">
                   {
                    profile?.skills?.length === 0 && (
                      <li className="text-gray-500 text-[10px] font-semibold p-2 bg-gray-200 rounded-lg">No skills available</li>
                    )}
                    {
                      profile?.skills?.map((skill, index) => (
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
                    <p className="text-gray-500 text-[14px] flex items-center gap-2"><MdOutlineMailOutline className="h-5 w-5" /> <span className="text-gray-500 text-[14px]"> {profile?.email}</span> </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[14px] flex items-center gap-2"><SlGlobe className="h-5 w-5" /> <span className="text-gray-500 text-[14px]"> www.{profile?.contact?.website} </span> </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[14px] flex items-center gap-2"><FaGithub className="h-5 w-5" /> <span className="text-gray-500 text-[14px]">{profile?.contact?.github} </span> </p>
                  </div>
                </div>
              </div>
    
            </div>
    
            <div className="w-full md:w-[60%] gap-3 flex flex-col justify-start items-center md:ml-4 h-full ">
              {/* Experience */}
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-gray-800 font-semibold text-xl">Experience</h1>{
                  profile?.experience?.length === 0 && (
                    <div className="w-full text-center py-4">
                      <p className="text-gray-500">No experience available</p>
                    </div>
                  )
                }
                {
                  profile?.experience.map((exp, index) => (
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
               
    
              </div>
              {/* Education */}
              <div className="w-full h-fit bg-white shadow-lg rounded-lg p-4 mt-4">
                <h1 className="text-gray-800 font-semibold text-xl">Education</h1>{
                  profile?.education?.length === 0 && (
                    <div className="w-full text-center py-4">
                      <p className="text-gray-500">No education available</p>
                    </div>
                  )
                }
                {
                  profile?.education.map((edu, index) => (
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
               
              </div>
    
              {/* Projects  or Posts */}
              <div className="w-full h-[400px] bg-white shadow-lg rounded-lg p-4 mt-4 ">
            <h1 className="text-gray-800 font-semibold text-xl">Post</h1>
            <div className="flex flex-wrap w-full gap-4 mt-2 overflow-y-auto h-full">
              {profile?.posts?.length === 0 && (
                <div className="w-full text-center py-4">
                  <p className="text-gray-500">No posts available</p>
                </div>
              )}
              {
                profile?.posts?.map((post, index) => (
                  <div className='w-full md:w-[45%]  bg-white shadow-lg rounded-lg p-4' key={index}>
                    <img className="w-full rounded-lg" src={`${post?.image}`} alt="project img" />
                    <h1 className="text-gray-800 font-semibold text-lg">Post 1</h1>
                    <p className="text-gray-500 text-[14px]">{post.description}</p>
                    <p className="text-gray-800 text-[14px] font-semibold "> <span>{post?.likes?.length} likes</span> <span>{post?.comments?.length} comments</span> </p>
                  </div> ))
              }
              
            </div>
          </div>

              
            </div>
          </div>
    
        </div >
   
  )
}

export default ProfileDetails ;