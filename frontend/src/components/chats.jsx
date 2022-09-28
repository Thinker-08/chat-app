import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import {Box} from "@chakra-ui/react";
import SideDrawer from './Miscellaneous/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const Chats = () => {
  const {user} = ChatState();
  return (
    <div style={{width:'100%'}}>
      
      <Box d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default Chats
