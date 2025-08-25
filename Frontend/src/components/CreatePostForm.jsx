import { useState ,useRef   } from "react";
import { useUserContext } from "../Context/UserContext";
import toast from "react-hot-toast"

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const ref = useRef(null);
  const { user,setUser } = useUserContext();
const [loading,setLoading] = useState(false)
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Send post data to backend
    const formData = new FormData();
    formData.append("description", content);
    if (image) {
      formData.append("file", image);
    }
   
   try{
    setLoading(true)
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/uploads/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    }
    );
    
    if (!res.ok) {
      console.error("Failed to create post");
      toast.error("Failed to create post");
      return;
    }
    const data = await res.json();
    toast.success("Post created successfully");
    setUser(data.updatedUser);
    console.log(data);
   }
   catch(err){
    console.log(err)
  }
  finally{
    setLoading(false)
  }

    handleCancel(); // Clear after submit

  };

  const handleCancel = () => {
    setContent("");
    setImage(null);
    setPreview(null);
    ref.current.style.display = "none"; // Hide the form

  };

  return (
    <div  ref={ref} className="bg-white p-4 rounded-xl shadow-xl  mb-6 absolute w-[80%] top-35 lg:top-30 left-[10%] lg:left-[20%] md:w-[80%] lg:w-[60%] z-10 h-auto  ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={`${user?.profilepic}`}
            alt="user"
            className="w-12 h-12 rounded-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 bg-gray-100 rounded-md resize-none min-h-[100px]"
          />
        </div>

        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="preview"
              className="max-h-60 rounded-md mx-auto"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="text-sm text-blue-500 cursor-pointer">
            📸 Add image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button disabled={loading}
              type="submit"
              className="bg-[#4C4EE7] text-white px-4 py-2 rounded-md hover:bg-[#3B3DE0] cursor-pointer"
            >
              {!loading?"Post":"Posting..."}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
