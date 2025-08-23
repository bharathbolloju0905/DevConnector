import React, { useState } from 'react'
import { useUserContext } from '../Context/UserContext';

const FeedNavigation = ({ setPosts, fetchPosts, posts }) => {
  const { user } = useUserContext();
  const [Feed, setFeed] = useState({
    feed: true,
    trending: false,
    followers: false
  });
  const handleFeed = (e) => {
    const name = e.target.getAttribute("name");
    console.log(name);
    setFeed({
      feed: name === 'feed',
      trending: name === 'trending',
      followers: name === 'following'
    });

    if (name === 'feed') {
      fetchPosts();
    }
    if (name === 'trending') {
      fetchPosts();
    }
    if (name === 'following') {
      const filteredPosts = posts.filter(post => user.following.includes(post.userId._id));
      console.log("Filtered Posts", filteredPosts);
      setPosts(filteredPosts);
    }

  };
  return (
    <div className=' h-[50px] flex items-center justify-between px-4  w-full bg-white md:z-10 shadow-lg mt-4 rounded-lg transition duration-300 sticky top-0 '>
        <div name="feed" className={`flex justify-center items-center border-b-2  w-1/3 h-full py- cursor-pointer   ${Feed.feed ? 'border-[#4C4EE7] text-[#4C4EE7]' : 'border-transparent text-black'}`} onClick={handleFeed}>
            <h2 name="feed" >Feed</h2>
        </div>
        <div name="trending" className={`flex justify-center items-center border-b-2  w-1/3 h-full py-2 cursor-pointer  ${Feed.trending ? 'border-[#4C4EE7] text-[#4C4EE7]' : 'border-transparent text-black'}`} onClick={handleFeed}>
            <h2 name="trending" >Trending</h2>
        </div>
        <div name="following" className={`flex justify-center items-center border-b-2  w-1/3 h-full py-2 cursor-pointer  ${Feed.followers ? 'border-[#4C4EE7] text-[#4C4EE7]' : 'border-transparent text-black'}`} onClick={handleFeed}>
            <h2 name="following" >Following</h2>
        </div>
    
    </div>
  )
}

export default FeedNavigation