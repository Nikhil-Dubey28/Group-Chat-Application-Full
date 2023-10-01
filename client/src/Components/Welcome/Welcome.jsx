import React from 'react'
import logo from '../../Images/live-chat.png'
import HeaderForMobile from '../HeaderForMobile/HeaderForMobile'


const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='boss-container'>
      <HeaderForMobile />
    <div className='welcome-container'>
        <img src={logo} alt='logo' className='welcome-logo'></img>
        <p className='ug-header' style={{color:"black",padding:"10px 10px"}}>Welcome {user.name[0].toUpperCase()}{user.name.slice(1)}!</p>
        <p className='welcome-container-para'>"Empowering Real-Time Connections: Chat Anytime, Anywhere."</p>
    </div>
    </div>
  )
}

export default Welcome