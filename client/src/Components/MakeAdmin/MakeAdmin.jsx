import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SearchIcon from '@mui/icons-material/Search'
import '../myStyles.css'
import axios from 'axios';

import Users from '../Users/Users';
import { useNavigate, useParams } from 'react-router-dom';

const MakeAdmin = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const dyParams = useParams()
  const [chat_id, chat_user] = dyParams.id.split('&')

  const [selectedUsers , setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState('')
  const [addMembersFlag, setAddMembersFlag] = useState(false);



  useEffect(() => {
    
            fetchUsers()
            console.log(users)
  },[setAddMembersFlag])



  const fetchUsers = async() => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:3000/api/group/fetch-users-to-make-admin/${chat_id}`, {
                  headers: {
                      Authorization: token
                  }
              })
              console.log(response)
  
              setUsers(response.data)
            } catch (error) {
              console.log(error)
            }
          }
async function handleAdd () {
try {
  
  const token = localStorage.getItem('token')

  const response = await axios.put(`http://localhost:3000/api/group/make-admin/${chat_id}`,{
          
          members : selectedUsers
  },{

    headers:{
      Authorization: token
    }
  })
  console.log(response)
  if(response.status == 200) {
    alert('Admin made successfully')
  }else if (response.status == 401) {
    alert('only an admin can make someone else an admin')
  }
fetchUsers()
} catch (error) {
  if (error.response.status == 401) {
    alert('only an admin can make someone else an admin')
  }
}
}

const handleCheckboxChange = (email) => {
  setSelectedUsers((prev) => {
    if(prev.includes(email)) {
      return prev.filter((prevEmail) => prevEmail !== email)
    }else {
      return [...prev,email]
    }
  })
}


  return (
    <>
  
    
    <div className='list-container'>
     
    <div className='ug-header' style={{justifyContent:"center"}}>
                <h1 className='con-title' style={{text:'center'}}>Make Admin</h1>
            </div>
       
        <div className='sb-search'>
            <IconButton>
                <SearchIcon />
            </IconButton>
            <input type="text" placeholder='Add Users' className='search-box' />
        </div>
       
       
                  {users.map((user) => {
                    return(
                      <div className='conversation-container2'>
                    <>
                    <p className='con-icon2'>{user.name[0]}</p>
                      <p className='con-title2'>{user.name}</p>
                      <p className='con-lastMessage2'>{user.email}</p>
                   
                      
                    <input type='checkbox' style={{marginRight: '0px', transform:'scale(0.6)'}}
                    onChange={() => handleCheckboxChange(user.email)}
                    checked = {selectedUsers.includes(user.email)}
                    >


                    </input>
                    </>
                </div>
                  )})}
                  
                  
                  
                
     
        
        
        
        
        
                
        
        
        <div style={{display: "flex",justifyContent:"center" ,position:"sticky",bottom: "0"}} className='create-group-button-div'>
        <Button className='create-group-button' onClick = {handleAdd}>Make Admin</Button>

        </div>
    </div>
    
    
   
    </>
  )
}

export default MakeAdmin

