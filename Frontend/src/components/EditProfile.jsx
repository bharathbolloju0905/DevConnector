import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'
import { useUserContext } from '../Context/UserContext';
import useUpdateDetails from '../hooks/UpdateDetailsHook';

const EditProfile = () => {
    const [isopen, setisopen] = useState(true)
    const [skills, setskills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [inputdetails, setInputdetails] = useState({
        fullname: "",
        profession: "",
        email: "",
        contact: {
            address: "",
            website: "",
            github: ""
        },
        bio: ""
    });



    const { loading, updateDetails } = useUpdateDetails();

    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    const { user } = useUserContext();

    useEffect(() => {
        setEducation(user?.education || []);
        setExperience(user?.experience || []);
        setskills(user?.skills || []);
        setInputdetails({
            fullname: user?.fullname || "",
            profession: user?.profession || "",
            email: user?.email || "",

            address: user?.contact?.address || "",
            website: user?.contact?.website || "",
            github: user?.contact?.github || "",

            bio: user?.bio || ""
        });
    }, [user]);

    function handleChange(e) {
        setInputdetails({
            ...inputdetails,
            [e.target.name]: e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log({ inputdetails, skills, experience, education, image: profileImage, profileImagePreview });

        await updateDetails({
            inputdetails,
            skills,
            experience,
            education,
            image: profileImage,
        });
        setisopen(false);
    }

    // Handler for file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file)); // For preview
        }
    };

    return (
        <div className={`absolute top-10 left-[5%] md:left-[20%] w-[90%] md:w-[60%] bg-white flex flex-col items-start justify-center rounded-lg p-4 mt-4 h-full shadow-2xl ${!isopen && "hidden"}`}>
            <h1 className="text-gray-800 font-semibold text-xl">Edit Profile</h1>
            <form onSubmit={handleSubmit} className='w-full h-full overflow-y-auto'>
                <RxCross2 className='h-5 w-5 absolute top-2 right-2 cursor-pointer' onClick={() => setisopen(!isopen)} />
                <div className='flex flex-col md:flex-row justify-center w-full gap-2 mt-4'>
                    <div>
                        <img className='h-25 w-25 rounded-full' src={`${import.meta.env.VITE_BASE_URL}${user?.profilepic}`} alt="" />
                    </div>
                    <div className='flex flex-col items-start justify-center '>
                        <h2 className='text-lg font-semibold'>Profile photo</h2>
                        <p className='text-gray-800 text-[12px]'>Recommended: Square image, at least 400x400px</p>
                        <input
                            className='text-[#4C4EE7]'
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {profileImagePreview && (
                            <img
                                src={profileImagePreview}
                                alt="Profile Preview"
                                className="h-24 w-24 rounded-full mt-2"
                            />
                        )}
                    </div>

                </div>
                <div className='flex flex-col md:flex-row flex-wrap gap-2 mt-4 w-full justify-center '>
                    <div className='md:w-[49%] w-full'>
                        <label htmlFor="Full name" className='text-black font-semibold'>Full name</label> <br />
                        <input className='border-[1px] border-gray-300 rounded-lg p-1  pl-3 w-full focus:border-[1px] focus:border-amber-400' type="text" name="fullname" placeholder='Full name' required value={inputdetails.fullname} onChange={handleChange} />
                    </div>
                    <div className='md:w-[49%] w-full'>
                        <label htmlFor="Proffession" className='text-black font-semibold'>Proffession</label> <br />
                        <input type="text" className='border-1 border-gray-300 rounded-lg p-1 pl-3 w-full' placeholder='Proffessional Tile' required value={inputdetails.profession} name="profession" onChange={handleChange} />
                    </div>
                    <div className='md:w-[49%] w-full'>
                        <label htmlFor="email" className='text-black font-semibold'>Email</label> <br />
                        <input type="email" className='border-1 border-gray-300 rounded-lg p-1 pl-3 w-full' placeholder='email' required value={inputdetails.email} name='email' onChange={handleChange} />
                    </div>
                    <div className='md:w-[49%] w-full'>
                        <label htmlFor="email" className='text-black font-semibold'>Location</label> <br />
                        <input type="text" className='border-1 border-gray-300 rounded-lg p-1 pl-3 w-full' placeholder='Location' name='address' value={inputdetails.address} onChange={handleChange} required/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="bio" className='text-black font-semibold'>Bio</label> <br />
                        <textarea className='border-1 border-gray-300 rounded-lg p-1 pl-3 w-full' name="bio" id="" cols="20" rows="10" placeholder='Bio' onChange={handleChange} value={inputdetails.bio}>{user?.bio}</textarea>
                    </div>

                    <div className='md:w-[49%] w-full'>
                        <label htmlFor="website" className='text-black font-semibold'>Personal Website</label> <br />
                        <input type="text" className='border-1 border-gray-300 rounded-lg p-1 pl-3 w-full' placeholder='Website' name='website' onChange={handleChange} value={inputdetails?.website} required/>
                    </div>
                    <div className='md:w-[49%] w-full'>
                        <label htmlFor="Github" className='text-black font-semibold'>GitHub</label> <br />
                        <input type="text" className='border-1 border-gray-300 rounded-lg p-1 pl-3 w-full' placeholder='GithUb profile' value={inputdetails?.github} name='github' onChange={handleChange} required/>
                    </div>
                    <div className="w-full mt-4">
                        <label htmlFor="skills" className="text-black font-semibold">Skills</label>
                        <p className='text-[12px] text-gray-800'>Add your all skills</p>
                        <div className="flex flex-wrap gap-2 mb-2 w-full text-[#4C4EE7]">
                            {skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center bg-[#c4b4d8] px-2 py-1 rounded-full text-sm mt-1 font-semibold"
                                >
                                    {skill}
                                    <RxCross2
                                        className="ml-1 cursor-pointer"
                                        onClick={() =>
                                            setskills(skills.filter((_, i) => i !== idx))
                                        }
                                    />
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 w-full mt-2">
                            <input
                                type="text"
                                className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-full"
                                placeholder="Add a skill"
                                value={skillInput || ""}

                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" && skillInput?.trim()) {
                                        setskills([...skills, skillInput.trim()]);
                                        setSkillInput("");
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="bg-[#4C4EE7] text-white px-3 py-1 rounded cursor-pointer"
                                onClick={() => {
                                    if (skillInput?.trim()) {
                                        setskills([...skills, skillInput.trim()]);
                                        setSkillInput("");
                                    }
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    {/* Education */}
                    {/* Education Section */}
                    <div className="w-full mt-4">
                        <label className="text-black font-semibold">Education</label>
                        <p className="text-[12px] text-gray-800">Add your education details</p>
                        <EducationSection setEducation={setEducation} education={education} />
                    </div>

                    {/* Experience Section */}
                    <div className="w-full mt-4">
                        <label className="text-black font-semibold">Experience</label>
                        <p className="text-[12px] text-gray-800">Add your work experience</p>
                        <ExperienceSection experience={experience} setExperience={setExperience} />
                    </div>
                    < button disabled={loading} type="submit" className="bg-[#4C4EE7] px-4 py-2 font-semibold mb-4 text-white rounded-lg cursor-pointer ">
                      {!loading ?  "Save & Update" : "Updating..."}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile