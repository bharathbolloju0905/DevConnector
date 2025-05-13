const mongoose = require('mongoose');
module.exports = ConnectTODB = async()=>{
   try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("Connected to MongoDB");
   }
   catch(err){
         console.log("Error connecting to MongoDB", err);
   }
}