const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/UserModel")
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

const registerUser = asyncHandler(async(req,res)=>{
    try{
        const {name,email,password,pic} = req.body; 
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter All the fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        }); 
    }else{
        res.status(400);
        throw new Error("Failed to create new User");
    }
    } catch(err) {
        console.log(err);
    }
});

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        console.log("Invalid Email or Password")
        throw new Error("Invalid Email or Password");
    }
});

const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query.search?{
        $or:[
            {name: {$regex: req.query.search, $options: "i"}},
            {email:{$regex: req.query.search, $options:"i"}},
        ]
    }:{};

    const users = await User.find(keyword).find({_id: {$ne:req.user._id}});
    res.send(users);
})
module.exports = {registerUser,authUser,allUsers};