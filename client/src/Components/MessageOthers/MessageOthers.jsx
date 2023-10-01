import React from 'react'

const MessageOthers = ({name,message,email}) => {
   
  return (
    <div className='other-message-container'>
        <div className='conversation-container'>
            <p className='con-icon'>{name[0]}</p>
            <div className='other-text-content'>
                <p className='con-title'>{name} <span className='con-title2' style={{fontSize:"0.9rem",color:"grey",marginLeft:"0",fontWeight:"300",textTransform:"initial"}}>({email})</span></p> 
                {/* <p className='con-title'>{email}</p> */}
                <p className='con-lastMessage'>{message}</p>
                {/* <p className='self-timeStamp'>12:00am</p> */}
            </div>
        </div>
    </div>
  )
}

export default MessageOthers