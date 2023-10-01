import React, { useContext, useEffect, useState } from 'react'
import { GroupContext } from '../GroupContext/GroupContext';
import '../myStyles.css'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import logo from '../../Images/live-chat.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import HeaderForMobile from '../HeaderForMobile/HeaderForMobile';

const Groups = () => {
    const navigate = useNavigate()
    const {refresh,setRefresh} = useContext(GroupContext)

    const [groups,setGroups] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
            const token = localStorage.getItem('token')

            const response = await axios.get(`http://localhost:3000/api/group/fetch-groups`,{
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
    }, [])

    const handleGroupClick = async(group) => {
        try {
                console.log(group.name)
            const token = localStorage.getItem('token')
            const response = await axios.post(`http://localhost:3000/api/conversation/add-conversation/${group.id}`,{groupName:group.name.toString()},{
                headers:{
                    Authorization:token
                }
            })
console.log(response)

           
            if(response.status === 201) {
                alert('conversation added successfully')
                setRefresh((prev) => !prev)
                console.log('refreshed')
            }
        }catch(err) {
            if(err.response.status === 401) {
                setRefresh((prev) => !prev)
                alert('conversation already added')
            }
        }

    }
    return (
        
     
      
        
        <div className='list-container'>
            <div className='ug-header-mobile' style={{justifyContent:"center"}}>
                {/* <img src={logo} style={{ height: "2rem", width: '2rem',justifyContent:"center" }} alt="" /> */}
                {/* <p className='con-title' style={{text:"center", fontSize:"2rem"}}>Available Groups</p> */}
                <HeaderForMobile />
            </div>
            <div className='ug-header' style={{justifyContent:"center"}}>
                {/* <img src={logo} style={{ height: "2rem", width: '2rem',justifyContent:"center" }} alt="" /> */}
                <p className='con-title' style={{text:"center", fontSize:"2rem"}}>Available Groups</p>
                {/* <HeaderForMobile /> */}
            </div>
            <div className='sb-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input type="text" placeholder='Search' className='search-box' />
            </div>
            <div className='ug-list'>
            {groups.length ? groups.map((group) => {
        return (
            <>
            {/* <div className='list-item' key={group.id} onClick={() => navigate(`/app/chat/${group.id}&${group.name}`)}> */}
            <div className='list-item' key={group.id} onClick={() => handleGroupClick(group)}>
                <p className='con-icon'>{group.name[0]}</p>
                <p className='con-lastMessage4'>{group.name}</p>
            <div>
                {/* <p className='con-lastMessage'>{group.email}</p> */}
                </div>
            </div>

                </>
        );
    }) : <p className='con-title2' style ={{textAlign:"center"}}>Nothing to show...You are not part of any groups :( </p>}
                
            </div>
        </div>
        
    )
}

export default Groups



