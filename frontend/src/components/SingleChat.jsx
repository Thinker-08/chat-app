import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender,getSenderFull } from '../config/ChatLogic'
import { ChatState } from '../Context/ChatProvider'
import ProfileModel from './Miscellaneous/ProfileModel'
import UpdateGroupChatModel from './Miscellaneous/UpdateGroupChatModel'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
  const { user, selectedChat, setSelectedChat} = ChatState()
    return (
    <>
     {selectedChat?(
        <>
            <Text
                fontSize={{base:"28px", md:"30px"}}
                pb={3}
                px={2}
                w="100%"
                display="flex"
                justifyContent={{base:"space-between"}}
                alignItems="center"
            >
            <IconButton
                display={{base:"flex", md:"none"}}
                icon={<ArrowBackIcon />}
                onClick={()=>{setSelectedChat("")}}
            />
            {!selectedChat.isGroupChat?(
                <>
                    {getSender(user,selectedChat.users)}
                    <ProfileModel user={getSenderFull(user,selectedChat.users)}/>
                </>
            ):(
                <>{selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                </>
            )}
            </Text>
            <Box
               display="flex"
               flexDir="column"
               justifyContent="flex-end"
               p={3}
               bg="white"
               w="100%"
               h="100%"
               borderRadius="lg"
               overflowY="hidden"
            >
                Messages Here
            </Box>
        </>
     ):(
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
        >
        <Text
            fontSize="3xl"
            pb={3}
        >
        Click on a user to start Chatting
        </Text>
        </Box>
     )}
    </>
  )
}

export default SingleChat
