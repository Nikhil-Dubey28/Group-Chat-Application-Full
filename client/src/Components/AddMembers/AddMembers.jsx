import React, { useContext, useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SearchIcon from '@mui/icons-material/Search'
import '../myStyles.css'
import axios from 'axios';

import Users from '../Users/Users';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupContext } from '../GroupContext/GroupContext';

const AddMembers = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const dyParams = useParams()
  const [chat_id, chat_user] = dyParams.id.split('&')

  const [selectedUsers , setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState('')
  const [addMembersFlag, setAddMembersFlag] = useState(false);

  const {refresh,setRefresh} = useContext(GroupContext)



  useEffect(() => {
    
            fetchUsers()
            console.log(users)
  },[setAddMembersFlag])



  const fetchUsers = async() => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:3000/api/group/fetch-users-to-add/${chat_id}`, {
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
  setAddMembersFlag(prevFlag => !prevFlag)
  const token = localStorage.getItem('token')

  const response = await axios.post(`http://localhost:3000/api/group/add-to-group/${chat_id}`,{
          
          members : selectedUsers
  },{

    headers:{
      Authorization: token
    }
  })
  console.log(response)
  if(response.status == 201) {
    setRefresh((prev) => !prev)
    alert('members added successfully')
  }else if (response.status == 401) {
    alert('only admin can add new members')
  }
fetchUsers()
} catch (error) {
  if (error.response.status == 401) {
    alert('only admin can add new members')
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
                <h1 className='con-title' style={{text:'center'}}>Add Members</h1>
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
        <Button className='create-group-button' onClick = {handleAdd}>Add Members To Group</Button>

        </div>
    </div>
    
    
   
    </>
  )
}

export default AddMembers

