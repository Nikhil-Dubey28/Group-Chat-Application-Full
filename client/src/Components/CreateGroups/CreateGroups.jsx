import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SearchIcon from '@mui/icons-material/Search'
import '../myStyles.css'
import axios from 'axios';

import Users from '../Users/Users';
import { useNavigate } from 'react-router-dom';
import HeaderForMobile from '../HeaderForMobile/HeaderForMobile';

const CreateGroups = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const [selectedUsers , setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3000/api/users/fetchUsers`, {
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
            fetchUsers()
            console.log(users)
  },[])


const handleCreate = async () => {
try {
  const token = localStorage.getItem('token')

  const response = await axios.post(`http://localhost:3000/api/group/create-group`,{
          groupName,
          members : selectedUsers
  },{

    headers:{
      Authorization: token
    }
  })
  console.log(response)
  if(response.status == 201) {
    alert('Group created successfully')
    navigate('/app/groups')
  }
  
} catch (error) {
  console.log(error)
  if(error.response.status === 404) {
    alert('no members added. you need to add at least 1 member')
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
   
    
    <div className='list-container'>
    <div className='ug-header-mobile'style={{justifyContent:"center"}}>
            {/* <img src={logo} style= {{height: "2rem",width: '2rem'}}alt="" /> */}
            {/* <h2 className='con-title'>Create Group</h2> */}
            <HeaderForMobile />
        </div>
        <div className='ug-header'style={{justifyContent:"center"}}>
            {/* <img src={logo} style= {{height: "2rem",width: '2rem'}}alt="" /> */}
            <h2 className='con-title'>Create Group</h2>
            
        </div>
    <div className='createGroups-container'>
    
    <input type="text" placeholder='Enter Group Name' className='search-box' value={groupName}
    onChange={(e) => setGroupName(e.target.value)}
    />
    {/* <IconButton>
        <DoneOutlineIcon />
    </IconButton> */}
   
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
        <Button className='create-group-button' onClick = {handleCreate}>Create group</Button>

        </div>
    </div>
    
    
   
                      
  )
}

export default CreateGroups

