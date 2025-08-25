const postModel =  require('../model/postModel');

const userModel = require("../model/userModel");


module.exports.getUploadedImage = async (req, res) => {
    try {
        const file = req.file;
        const { description } = req.body;
        console.log(file);
        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
       const filePath = req.file.path; 
       console.log('File uploaded to:', filePath);
        const userId = req.user.id;
        const newpost = await postModel.create({
            description,
            image: filePath,
            userId: userId ,
        });
        const user = await userModel.findById(userId);
        let posts = user.posts;
        posts = [...posts,newpost._id]
        const updatedUser = await userModel.findByIdAndUpdate(userId,{
            $set:{
                posts:posts
            }

        },{new:true})
        updatedUser.password = undefined ;
        return res.status(200).json({ filePath ,newpost,updatedUser});
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports.getUpdateDetails = async (req, res) => {
    try {
        const file = req.file;
        console.log('File:', file);
        var { inputdetails,skills,experience,education} = req.body ;
    
     
        inputdetails = JSON.parse(inputdetails);
        skills = JSON.parse(skills);
        experience = JSON.parse(experience);
        education = JSON.parse(education);
    

        if (!inputdetails || !inputdetails.fullname || !inputdetails.email || !inputdetails.bio || !inputdetails.profession) {
            return res.status(400).json({ message: 'All input details are required' });
        }
        // if (!file) {
        //     return res.status(400).json({ message: 'No file uploaded' });
        // }
       
        // const filePath = `/${file?.filename}`;
        const filePath = file ? req.file.path : 'https://res.cloudinary.com/dq8bvbhrj/image/upload/v1756053965/defaultimage_ln9ekd.jpg';

        const updated = await userModel.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    fullname: inputdetails.fullname,
                    email: inputdetails.email,
                    bio: inputdetails.bio,
                    profession: inputdetails.profession,
                    profilepic: filePath,
                    contact: {
                        website: inputdetails.website,
                        github: inputdetails.github,
                        address: inputdetails.address,
                    },
                    skills:skills,
                    experience:experience,
                    education: education
                },
            },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

       return res.status(200).json({ message: 'Details updated successfully', user: updated });
 
    } catch (error) {
        console.error('Error updating details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({ userId: { $ne: req.user.id } })
            .populate('userId', 'fullname profilepic profession')
            .sort({ createdAt: -1 });
        if (!posts) {
            return res.status(404).json({ message: 'No posts found' });
        }
        return res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.likePost = async (req,res)=>{
    postId = req.params.postId ;
    try {
        const userId = req.user.id;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.likes && post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
            await post.save();
            return res.status(200).json({ message: 'You  disliked this post' });
        }
        post.likes = post.likes ? [...post.likes, userId] : [userId];
        await post.save();
        return res.status(200).json({ message: 'Post liked successfully', post });
    } catch (error) {
        console.error('Error liking post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}