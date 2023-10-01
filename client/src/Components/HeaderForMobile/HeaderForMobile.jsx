
// import React, { useContext, useState,useEffect } from 'react';
// import '../myStyles.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import NightlightIcon from '@mui/icons-material/Nightlight';
// import SearchIcon from '@mui/icons-material/Search';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { Container, IconButton } from '@mui/material';
// import ConversationsItem from '../ConversationsItem/ConversationsItem';
// import { useNavigate } from 'react-router-dom';
// import { GroupContext } from '../GroupContext/GroupContext';
// import axios from 'axios';

// const HeaderForMobile = () => {
//     const navigate = useNavigate()
//     const{refresh,setRefresh} = useContext(GroupContext)
      
    
//     const [groups,setGroups] = useState([])
    
//         useEffect(() => {
//             const fetch = async () => {
//                 try {
//                 const token = localStorage.getItem('token')
    
//                 const response = await axios.get(`http://localhost:3000/api/conversation/get-conversation`,{
//                     headers: {
//                         Authorization: token
//                     }
//                 })
//                 console.log(response)
//                 setGroups(response.data)
//                 } catch (error) {
//                         console.log(error)
//                 }
//             }
//             fetch()
//         }, [refresh])
    
    
//       const handleLogout = () => {
    
//         localStorage.getItem('user');
//         localStorage.getItem('token');
    
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
    
//         navigate('/login')
//       }
    
//     //   const handleConversationClick = (group) => {
       
         
//     //       navigate(`/app/chat/${group.groupId}&${group.groupName}`)
        
//     //   }
    
//       return (
//         <div className="sidebar-container-mobile" style={{display:"flex",flexDirection:"column"}}>
//           <div className="sb-header-mobile">
//             <div>
//               <IconButton 
//               onClick={() => navigate('/app/welcome')}
//               >
//                 <AccountCircleIcon />
//               </IconButton>
//             </div>
    
//             <div>
//               {/* <IconButton
//               onClick={() => navigate('/app/users')}
//               >
//                 <PersonAddIcon />
//               </IconButton> */}
//               <IconButton
//               onClick={() => navigate('/app/groups')}
//               >
//                 <GroupAddIcon />
//               </IconButton>
//               <IconButton
//               onClick={() => navigate('/app/create-group')}
//               >
//                 <AddCircleIcon />
//               </IconButton>
//               <IconButton
//               onClick = {handleLogout}
//               >
//                 <LogoutIcon />
//               </IconButton>
//             </div>
//           </div>
//           {/* <div className="sb-search">
//             <IconButton>
//               <SearchIcon />
//             </IconButton>
    
//             <input
//               className="search-box"
//               type="text"
//               placeholder="Search..."
//               // value={searchQuery}
//               // onChange={handleSearchChange}
//             />
//           </div> */}
//           {/* <div className="sb-conversations" >
//             <div style={{backgroundColor:"rgb(236, 237, 234)",borderRadius:"10px",marginBottom: "20px",padding:"5px"}}>
//             <h2 className='con-title' style={{textAlign:"center",fontSize:"1.7rem"}}>My Conversations</h2>
//             </div>
            
//           {groups.length ? groups.map((group) => (
//               <div className='conversation-container' key={group.id} onClick={() => handleConversationClick(group)}>
//                 <p className='con-icon'>{group.groupName[0]}</p>
//                 <p className='con-title' style={{fontSize:"1.3rem",marginTop:"5px",marginLeft:"5px"}}>{group.groupName}</p>
//               </div>
//             )) : <p className='con-title2' style={{textAlign:"center",marginRight:"30px"}}>Nothing to show</p>}
          
//           </div> */}
//         </div>
//       );
// }

// export default HeaderForMobile






import React, { useContext, useState,useEffect } from 'react';
import '../myStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import SmsIcon from '@mui/icons-material/Sms';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, IconButton } from '@mui/material';
import ConversationsItem from '../ConversationsItem/ConversationsItem';
import { useNavigate } from 'react-router-dom';
import { GroupContext } from '../GroupContext/GroupContext';
import axios from 'axios';


const HeaderForMobile = () => {
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
    
    //   const handleConversationClick = (group) => {
       
         
    //       navigate(`/app/chat/${group.groupId}&${group.groupName}`)
        
    //   }
    
      return (
        
    <div className='sidebar-container-mobile'>
        <div className="sb-header-mobile">
            {/* <div>
             <IconButton 
              onClick={() => navigate('/app/welcome')}
              >
                <AccountCircleIcon />
              </IconButton>
              </div> */}
           
    
            <div>
            <IconButton 
              onClick={() => navigate('/app/welcome')}
              >
                <AccountCircleIcon />
              </IconButton>
              <IconButton
              onClick={() => navigate('/app/my-conversations')}
              >
                <SmsIcon />
              </IconButton>
              {/* <IconButton
              onClick={() => navigate('/app/users')}
              >
                <PersonAddIcon />
              </IconButton> */}
              <IconButton
              onClick={() => navigate('/app/groups')}
              >
                <GroupAddIcon />
              </IconButton>
              <IconButton
              onClick={() => navigate('/app/create-group')}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
              onClick = {handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </div>
          </div>
    </div>
    
      );
}

export default HeaderForMobile