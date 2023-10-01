import React, {useState, useEffect} from 'react'
import '../myStyles.css'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import logo from '../../Images/live-chat.png'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const ViewMembers = () => {
  const dyParams = useParams()
  const [chat_id, chat_user] = dyParams.id.split('&')
  const [users, setUsers] = useState([])
  const [userGroup,setUserGroup] = useState([])


  useEffect(() => {
    const fetch = async () => {
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
    fetch()
  },[])
  return (
    <div className='list-container'>
        <div className='ug-header'style={{justifyContent:"center"}}>
            {/* <img src={logo} style= {{height: "2rem",width: '2rem'}}alt="" /> */}
            <h2 className='con-title'>Group Members</h2>
        </div>
        <div className='sb-search'>
            <IconButton>
                <SearchIcon />
            </IconButton>
            <input type="text" placeholder='Search' className='search-box' />
        </div>
        <p style={{textAlign:"center"}} className='con-title'>Current admin/admins of the group:</p>
        {users.map((user) => {
      const isAdmin = userGroup.find((item) => item.userId === user.id && item.isadmin);
        return (
            <>
            {isAdmin && <h3 style={{textAlign:"center"}} className='con-lastMessage'> {user.name[0].toUpperCase()}{user.name.slice(1)}({user.email}), </h3>}

                </>
        );
    })}
        
        <div className='ug-list'> 
    {users.map((user) => {
      const isAdmin = userGroup.find((item) => item.userId === user.id && item.isadmin);
        return (
            <>
            <div className='list-item' key={user.id} onClick={() => navigate(`/app/chat/${user.id}&${user.name}`)}>
                <p className='con-icon'>{user.name[0]}</p>
                <p className='con-title'>{user.name}</p>
                {isAdmin && <span>(admin)</span>}
            <div>
                <p className='con-lastMessage'>{user.email}</p>
                </div>
            </div>

                </>
        );
    })}
</div>
        
        
    </div>
  )
}

export default ViewMembers