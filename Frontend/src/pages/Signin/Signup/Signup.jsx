import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [input , setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    // const navigate = useNavigate() ;
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        // navigate("/signin")
    }
  return (
    <div className='h-screen w-full flex '>
    <div className='h-screen w-1/2 bg-[#e7effe] flex items-center justify-center'>
        <div className='flex flex-col items-start justify-center gap-[2rem] w-2/4'>
            <div className='w-full'>
                <h1 className='text-3xl font-bold'>DevConnector</h1>
                <p className='text-sm text-gray-500'>Connect with developers around the world</p>
            </div>
            <div className='w-full '>
                <h2 className='text-2xl font-bold'> Create Your Account</h2>
                <form className='w-full flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
                    <label htmlFor="na,e" className='text-sm text-gray-600'>Full name</label>
                    <input type="text" name="fullname" id="fullname" className='w-full h-12 border border-gray-300 rounded-md px-4 bg-white' placeholder='Enter your Fullname' value={input.fullname} onChange={handleChange} required />

                    <label htmlFor="Email" className='text-sm text-gray-600'>Email address</label>
                    <input type="email" name="email" id="email" className='w-full h-12 border border-gray-300 rounded-md px-4 bg-white' placeholder='Enter your email address' value={input.email } onChange={handleChange} required />

                    <label htmlFor="Password" className='text-sm text-gray-600'>Password</label>
                    <input type="password" name="password" id="password" className='w-full h-12 border border-gray-300 rounded-md px-4 bg-white' placeholder='Enter your password' value={input.password} onChange={handleChange} required />
                    <p className='text-xs tex-black'>password must be 8 Characters long must contain one uppercase and lower case</p>
                    <label htmlFor="Password" className='text-sm text-gray-600'>Confirm Password</label>
                    <input type="password" name="confirmpassword" id="confirmpassword" className='w-full h-12 border border-gray-300 rounded-md px-4 bg-white' placeholder='Confirm your password' value={input.confirmpassword} onChange={handleChange} required />

                    <button  type="submit" className='w-full h-12 bg-[#4C4EE7] text-white rounded-md font-bold mt-5'>Create Account</button>
                    <p className='text-sm text-gray-500 text-center'>Already have an account? <a href="/signin" className='text-[#4C4EE7] font-bold'>Sign In</a></p>
                </form>
            </div>

        </div>
    </div>
    <div className='hidden h-screen w-1/2 bg-[#4C4EE7] flex items-center justify-center flex-col lg:flex  '>
        <div className='flex flex-col items-center justify-center gap-[2rem] w-2/4'>
            <div className='w-full rounded-lg overflow-hidden'>
                <img src="./src/assets/signup.jpg" alt="signin image" className='object-contain w-fit' />
            </div>
            <div className='w-full text-white flex flex-col items-start justify-center gap-4'>
                <h1 className='text-2xl font-bold'>Start your developer journey today</h1>
                <p className='text-md'>Join thousands of developers who are already part of our community. Share knowledge, collaborate on projects, and grow your career with like-minded professionals.</p>
            </div>

            <div className='w-full flex  items-start justify-center gap-4 font-semibold'>
               <button className='bg-white p-[10px] text-[#4C4EE7] rounded-md'><a href="/learn">View Features</a></button>
              <button className='border-[1px] border-white p-[10px]  rounded-md text-white '><a href="/learn">Success Stories</a></button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Signup