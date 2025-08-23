const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports.register = async (req, res) => {
    const { fullname, email, password, confirmpassword } = req.body;
   
    const isValid = Validate(fullname, email, password, confirmpassword);
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid input' });

    }
    const existingUser = await UserModel.find({ email });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    try {
        const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);
    const user = await UserModel.create({
        fullname,
        email,
        password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      await res.cookie('token', token, {
        httpOnly: true,
        secure: true ,//process.env.NODE_ENV === 'production',
        sameSite: 'none', 
        });

    res.status(201).json({
        message: 'User created successfully',
        user,
        token,
    });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const Validate = (fullname, email, password, confirmpassword) => {
    if (!fullname || !email || !password || !confirmpassword) {
        return false;
    }
    if (password !== confirmpassword) {
        return false;
    }
    if (password.length < 6) { // Changed to 6 to match frontend
        return false;
    }
    if(password.includes(' ')) {
        return false;
    }
    if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return false;
    }
    if (!email.includes('@')) {
        return false;
    }
    return true;
}

module.exports.login = async (req, res) => {
    console.log("Iam running...")
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      await res.cookie('token', token, {
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });
        res.status(200).json({
            message: 'Login successful',
            user,
            token,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).populate('posts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = undefined ;
        res.status(200).json({user});
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports.getPeopleYouKnow = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const peopleYouKnow = await UserModel.find({
            _id: { $ne: user._id, $nin: user.following }, 
            skills: { $elemMatch: { $in: user.skills } }
        }).limit(5);
        console.log('People you know:', peopleYouKnow);
      return res.status(200).json({ peopleYouKnow });
    } catch (error) {
        console.error('Error fetching people you know:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getUserDetails = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const user = await UserModel.findById(userId).populate('posts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = undefined; // Exclude password from response
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}