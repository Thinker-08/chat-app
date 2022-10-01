const express = require("express");
const connectDB = require("./config/db");
const app = express();
const {chats} = require("./temp")
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

require('dotenv').config();
connectDB();

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hi this is Home!!");
})
app.use('/api/chat',chatRoutes);

app.use('/api/user',userRoutes);

app.use('/api/message',messageRoutes);
app.use(notFound);

app.use(errorHandler );

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})