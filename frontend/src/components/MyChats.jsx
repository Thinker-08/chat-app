import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'

const MyChats = () => {
  const [loggedUser,setLoggedUser] = useState()
  const {selectedChat,setSelectedChat,user, chats,setChats} = ChatState();
  const toast = useToast();
  const fetchChats=async()=>{
    try{
      const config={
        Authorization:`Bearer ${user.token}`
      }
      const {data} = await axios.get("/api/chat",config);
      setChats(data);
    }catch(err){
      toast({
        title:"Error Occured",
        description:"Failed to Load Chat",
        status:"error",
        
      })
    }
  }
  return (
    <div>
      Hi These are your chats!!
    </div>
  )
}

export default MyChats
