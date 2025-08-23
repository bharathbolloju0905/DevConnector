import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar'
import SideProfile from '../../components/SideProfile'
import FeedNavigation from '../../components/FeedNavigation'
import CreatePost from '../../components/CreatePost'
import Post from '../../components/Post';
import Trending from '../../components/Trending'
import PeopleYouKnow from '../../components/PeopleYouKnow';
import CreatePostForm from '../../components/CreatePostForm'
import { useUserContext } from '../../Context/UserContext';
import axios from 'axios'


const Home = () => {
  const { user } = useUserContext();
  const [createpost, setcreatepost] = useState(false) ;
  const [posts, setPosts] = useState([]) ;
  console.log("Hello world iam bharah")
  console.log(user) ;


 const fetchPosts = async () => {
    try {
       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/allposts`, {
                        withCredentials: true,
                    });
    
      console.log("posts",response.data.posts)
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
useEffect(() => {
  fetchPosts();

}, []);


  return (
    <div className='w-full h-screen  flex flex-col '>
      <NavBar setPosts={setPosts} posts={posts} fetchPosts={fetchPosts}/>
      <div className='w-full h-full flex items-center justify-between mt-[40px] md:mt-[70px] md:justify-center'>
        <div className='w-1/4 h-full  hidden lg:flex  justify-center relative'>
          <SideProfile />
        </div>

         {createpost && <CreatePostForm />}
        <div className='w-full md:w-[70%] lg:w-[40%] h-full  flex flex-col items-center justify-start relative overflow-y-scroll pl-4 pr-4 hide-scroll pb-3'>
          <FeedNavigation  setPosts={setPosts} posts={posts} fetchPosts={fetchPosts} ></FeedNavigation>
          <CreatePost setcreatepost = {setcreatepost} createpost={createpost}></CreatePost>
          {
            posts.length > 0 ? posts.map((post) => (
              <Post key={post._id} post={post} fetchPosts={fetchPosts} />
            )) : (
              <div className='w-full h-full flex items-center justify-center'>
                <h2 className='text-2xl text-gray-500'>No Posts Available</h2>
              </div>
            )}
        </div>
        <div className='hidden lg:w-1/4 h-full lg:flex items-center  flex-col gap-4 '>

          <Trending></Trending>
          <PeopleYouKnow></PeopleYouKnow>
        </div>
      </div>
    </div>

  )
}

export default Home;