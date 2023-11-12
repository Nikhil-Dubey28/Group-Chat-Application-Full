import React, { useContext, useState,useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, IconButton } from '@mui/material';
import ConversationsItem from '../ConversationsItem/ConversationsItem';
import { useNavigate } from 'react-router-dom';
import { GroupContext } from '../GroupContext/GroupContext';
import axios from 'axios';
import HeaderForMobile from '../HeaderForMobile/HeaderForMobile'

const MyConversations = () => {
  const navigate = useNavigate()
  const{refresh,setRefresh} = useContext(GroupContext)
    
  
  const [groups,setGroups] = useState([])
  
      useEffect(() => {
          const fetch = async () => {
              try {
              const token = localStorage.getItem('token')
  
              const response = await axios.get(`http://localhost:3000/api/conversation/get-conversation`,{
                  headers: {
                      Authorization: token
                  }
              })
              console.log(response)
              setGroups(response.data)
              } catch (error) {
                      console.log(error)
              }
          }
          fetch()
      }, [refresh])
  
  
    const handleLogout = () => {
  
      localStorage.getItem('user');
      localStorage.getItem('token');
  
      localStorage.removeItem('user');
      localStorage.removeItem('token');
  
      navigate('/login')
    }
  
    const handleConversationClick = (group) => {
     
       
        navigate(`/app/chat/${group.groupId}&${group.groupName}`)
      
    }

  return (
    <div className='list-container'>
      <div className='ug-header-mobile'>
        <HeaderForMobile />
      </div>
      <div className='ug-header' style={{justifyContent:"center"}}>
                {/* <img src={logo} style={{ height: "2rem", width: '2rem',justifyContent:"center" }} alt="" /> */}
                <p className='con-title' style={{text:"center", fontSize:"2rem"}}>My Conversations</p>
                {/* <HeaderForMobile /> */}
            </div>
            <div className='sb-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input type="text" placeholder='Search' className='search-box' />
            </div>
            <div className='sb-conversations-mobile' style={{justifyContent:"center", marginLeft:"10px"}}>
            {groups.length ? groups.map((group) => (
          <div className='conversation-container' key={group.id} onClick={() => handleConversationClick(group)}>
            <p className='con-icon'>{group.groupName[0]}</p>
            <p className='con-title' style={{fontSize:"1.3rem",marginTop:"8px",marginLeft:"5px"}}>{group.groupName}</p>
          </div>
        )) : <p className='con-title2' style={{textAlign:"center",marginRight:"30px"}}>Nothing to show</p>}
      
            </div>
    </div>
  )
}

export default MyConversations