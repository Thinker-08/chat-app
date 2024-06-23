const mongoose = require("mongoose");
const connectDB = async(uri)=>{
    try{
        const connect = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB ${connect.connection.host}`);
    }
    catch(err){
        console.log(`Error: ${err.message}`);
        process.exit();
    }
};
module.exports = connectDB;