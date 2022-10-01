import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    useToast,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatname,setGroupChatName] = useState();
    const [search,serSearch] = useState("")
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [renameLoading,setRenameLoading] = useState(false);
    const toast = useToast();

    const {user,selectedChat,setSelectedChat} = ChatState();
    return (
        <>
        <IconButton 
            display={{base:"flex"}}
            icon={<ViewIcon />}
            isCentered
        onClick={onOpen}>Open Modal</IconButton>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
                fontSize="35px"
                
            >{selectedChat.chatName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              dasdasda
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}

export default UpdateGroupChatModel
