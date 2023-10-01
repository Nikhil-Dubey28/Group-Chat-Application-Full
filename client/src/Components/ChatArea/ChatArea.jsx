import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef, useState } from 'react'
import MessageOthers from '../MessageOthers/MessageOthers';
import MessageSelf from '../MessageSelf/MessageSelf';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AttachmentIcon from '@mui/icons-material/Attachment';
import axios from 'axios'
import socketIOClient from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { io } from 'socket.io-client';
import { useContext } from 'react';
import { GroupContext } from '../GroupContext/GroupContext';
import HeaderForMobile from '../HeaderForMobile/HeaderForMobile';
// import User from '../../../../server/model/User';

const ENDPOINT = 'http://localhost:3000';
var socket

const ChatArea = () => {
  const dyParams = useParams()
  const [chat_id, chat_user] = dyParams.id.split('&')
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState('')
  const [socketConnected, setSocketConnected] = useState(false);
  const [userGroup,setUserGroup] = useState([])
  const[users,setUsers] = useState([])
  const[userInUserGroup,setUserInUserGroup] = useState(true)
  const{refresh, setRefresh} = useContext(GroupContext)
  const navigate = useNavigate() 
  const messagesContainerRef = useRef(null);




  const user = JSON.parse(localStorage.getItem('user'))
  

 useEffect(() => {
 
socket = io(ENDPOINT);
socket.emit("setup",user.id)
socket.on("connection",() => {
  setSocketConnected(true)
})
 },[])



 useEffect(() => {
  
    socket.on("message received", (newMessageReceived) => {
      setMessages([...messages,newMessageReceived])
    })
  
  
 })

 



 useEffect(() => {
  const fetchUserInfo= async () => {
    const token  = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:3000/api/group/view-members/${chat_id}`,{
      headers: {
        Authorization: token
      }
    })
    console.log(response)
    setUsers(response.data.users)
    setUserGroup(response.data.userGroup)
  }
  fetchUserInfo()
},[])

 useEffect(() => {
   if (messagesContainerRef.current) {
     const container = messagesContainerRef.current;
     container.scrollTop = container.scrollHeight;
   }
 }, [messages]);
  

  useEffect(() => {
    const fetchMessages = async (chatId) => {
      try {
        

          const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3000/api/chat/get-message/${chatId}`, {
          headers: {
            Authorization: token
          }
        })
        console.log(response)
        // console.log(messages)
        setMessages(response.data)
        socket.emit("join chat", chat_id)
        console.log(messages)
        }
        
       catch (error) {
        console.log(error)
      }
    }
   
    fetchMessages(chat_id)


  }, [chat_id])

  useEffect(() => {
    const fetchUserGroupData = async () => {
      try {
        const token  = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:3000/api/group/view-members/${chat_id}`,{
        headers: {
          Authorization: token
        }
      })
      console.log(response)
      // setUsers(response.data.users)
      setUserGroup(response.data.userGroup)
      console.log(response.data.userGroup)
      
  
      const isUserInGroup = response.data.userGroup.some(group => group.userId === user.id)
      console.log(userInUserGroup)
     setUserInUserGroup(isUserInGroup)
      } catch (error) {
        console.log(error)
      }
      
  
    
    }
    fetchUserGroupData()
  },[chat_id])

  

  const handleSendMessage = async () => {
    try {
      
        const token = localStorage.getItem('token')

      const response = await axios.post(`http://localhost:3000/api/chat/send-message/${chat_id}`, {
        message: messageContent,
        chatId: chat_id,
        email:user.email
      }, {
        headers: {
          Authorization: token
        }
      })
      console.log(response)

      // Create a conversation for group members if it doesn't exist
    if (response.data && response.data.chat) {
      
    

      const chat = response.data.chat;
      const membersToSendMessageTo = userGroup
      .filter(user => user.userId !== user.id) // Exclude the current user
      .map(user => user.userId);

    for (const memberId of membersToSendMessageTo) {
      const existingConversation = await axios.get(`http://localhost:3000/api/conversation/get-conversation-by-id/${chat.groupId}/${memberId}`, {
        headers: {
          Authorization: token
        }
      });
      console.log(existingConversation)

      // Check if conversation already exists for the member
      if (!existingConversation.data) {
        await axios.post(`http://localhost:3000/api/conversation/add-conversation-for-members/${chat.groupId}`, {
          groupName: chat_user,
          userId: memberId
        }, {
          headers: {
            Authorization: token
          }
        });
        setRefresh((prev) => !prev)
      }
    }
    }
      

      socket.emit("new message", {
        message: messageContent,
        chatId: chat_id,
        name: user.name,
        email: user.email
      })
      setMessages([...messages, response.data.chat])
       
      setMessageContent('')
      
      
    } catch (error) {
      console.log(error)
      if(error.response.status === 401) {
        alert('you can no longer send messages in this group')
      }
    }
  }




const handleDeleteConvo = async(req,res) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.delete(`http://localhost:3000/api/conversation/delete-conversation/${chat_id}/${chat_user}`,{
      headers:{
        Authorization:token
      }
    })
    if(response.status == 200) {
      alert('conversation deleted successfully')
      setRefresh((prev) => !prev)
      navigate('/app/welcome')
    }
  } catch (error) {
    console.log(error)
  }
}

// const handleAttachClick = () => {
//   if (fileInputRef.current) {
//     fileInputRef.current.click();
//   }
// };

const handleFileUpload = async (e) => {

 
// e.preventDefault();
const file = e.target.files[0]
const formData = new FormData()

formData.append('file', file)

try {
  const token = localStorage.getItem('token')
const response = await axios.post(`http://localhost:3000/api/chat/upload`,formData,{
  headers:{
    'Content-Type': 'multipart/form-data',
    Authorization: token
  }
}
  
)

const fileLink = response.data.fileLink

setMessageContent(fileLink);
}catch(err) {
  console.log(err)
}

      

}


  return (
    // <div className='boss-container-chat'>
    //   <HeaderForMobile />
    <>
    
   
    
    <div className='chatArea-container'>
      <div className='ug-headder-mobile'>
        <HeaderForMobile />
      </div>
      <div className='chatArea-header'>
        <p className='con-icon'>{chat_user[0]}</p>
        <div className='header-text'>
          <p className='con-header-title'>{chat_user}</p>
          {/* <p className='con-timeStamp'>today</p> */}
        </div>
        <IconButton
          onClick={() => navigate(`/app/settings/${chat_id}`)}
        >
          {userInUserGroup &&
           (<Button>More options</Button>)}
        </IconButton>
        <IconButton
        onClick = {() => handleDeleteConvo()}
        >
          <DeleteIcon />
        </IconButton>

      </div>
      
      <div className='messages-container' ref = {messagesContainerRef}> 
        {messages.map((message, index) => {
          const senderId = message.userId
          const myId = user.id
          console.log(message)
          if (senderId == myId) {
            return (
              <MessageSelf message={message.message} key={index} />

            )
          } else {
            return (
              <MessageOthers name={message.name} message={message.message} key={index} email={message.email}/>

            )
          }
        })}
        {!userInUserGroup && (
          <div style={{display:"flex",justifyContent:"center"}}>
          <p>You are no longer part of this group</p>
          </div>
        )}
        {/* <MessageOthers /> */}
        {/* <MessageSelf /> */}
        {/* <MessageOthers /> */}
        {/* <MessageSelf /> */}
      </div>
      <div className='text-input-area'>
        <textarea type="text" placeholder='Type a message' className='search-box'
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          style={{ width: '100%' }}

          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              e.preventDefault()
              handleSendMessage()
              setMessageContent('')
            }
          }}
        />
        <label className='custom-file-upload' htmlFor='file-input' style={{display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
          
          <input type='file' id='file-input' className='d-none'  onChange={handleFileUpload}  />
            <AttachmentIcon  />

        </label>
        <IconButton
          onClick={handleSendMessage}
        >
          <SendIcon />
        </IconButton>
      </div>

    </div>
    
    </>
  )
}

export default ChatArea