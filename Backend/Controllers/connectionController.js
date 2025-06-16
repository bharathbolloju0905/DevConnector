const userModel = require('../model/userModel')

module.exports.ConnectUser = async(req,res)=>{
    const { personId } = req.body;
    const userId = req.user.id;
    console.log(personId,"iamrunnnin",userId)
    if (!personId || !userId) {
        return res.status(400).json({ message: "Invalid request" });
    }

    try {
        
        const user = await userModel.findById(userId);
        const person = await userModel.findById(personId);

        if (!user || !person) {
            return res.status(404).json({ message: "User or person not found" });
        }
        // Check if the connection already exists
        const existingConnection = user.followers.find(conn => conn.toString() === personId);
        if (existingConnection) {
            return res.status(201).json({ message: "Already connected" });
        }
        // Add the person to the user's connections
        user.followers.push(personId);
        await user.save();

        person.following.push(userId);
        await person.save();

        return res.status(201).json({ message: "Connection successful" });
    } catch (error) {
        console.error("Error connecting:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}