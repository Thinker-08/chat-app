import React, { useEffect, useState } from 'react'
import axios from "axios";
const Chats = () => {
    const [chats, setchats] = useState([]);
    const fetchChats = async()=>{
        console.log("123");
        const {data} = await axios(`/api/chats/`);
          console.log(data);
        setchats(data);
    }
    useEffect(() => {
        fetchChats();
    }, [])
    
  return (
    <div>
        Hi This is Chats.!!!
        {chats.map(chat=><div key={chat._id}>{chat.chatName} </div>)}
    </div>
  )
}

export default Chats
