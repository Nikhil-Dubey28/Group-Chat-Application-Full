import React, {useState, useEffect} from 'react'
import '../myStyles.css'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import logo from '../../Images/live-chat.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])


    useEffect(() => {
        const fetch = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:3000/api/users/fetchUsers`, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response)
    
                setUsers(response.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetch()
    },[])
  return (
    <div className='list-container'>
        <div className='ug-header'>
            <img src={logo} style= {{height: "2rem",width: '2rem'}}alt="" />
            <p className='ug-title'>Online Users</p>
        </div>
        <div className='sb-search'>
            <IconButton>
                <SearchIcon />
            </IconButton>
            <input type="text" placeholder='Search' className='search-box' />
        </div>
        
        <div className='ug-list'> 
    {users.map((user) => {
        return (
            <>
            <div className='list-item' key={user.id} onClick={() => navigate(`/app/chat/${user.id}&${user.name}`)}>
                <p className='con-icon'>{user.name[0]}</p>
                <p className='con-title'>{user.name}</p>
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

export default Users