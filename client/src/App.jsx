import { useState } from 'react'

import './App.css'
import MainContainer from './Components/MainContainer/MainContainer'
import {BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'
import CreateGroups from './Components/CreateGroups/CreateGroups'
import Welcome from './Components/Welcome/Welcome'
import ChatArea from './Components/ChatArea/ChatArea'
import Login from './Components/Login/Login'
import Users from './Components/Users/Users'
import Groups from './Components/Groups/Groups'
import Signup from './Components/Signup/Signup'
import MyComponent from './Components/Test'
import Settings from './Components/Settings/Settings'
import AddMembers from './Components/AddMembers/AddMembers'
import RemoveMembers from './Components/RemoveMembers/RemoveMembers'
import ViewMembers from './Components/ViewMembers/ViewMembers'
import MakeAdmin from './Components/MakeAdmin/MakeAdmin'
import MyConversations from './Components/MyConversations/MyConversations'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <div className='App'>
  <Routes>
    <Route path='/' element={<Signup />}> </Route>
    <Route path='/test' element={<MyComponent />}> </Route>
    <Route path='/login' element={<Login />}> </Route>
    <Route path='app' element={<MainContainer />}> 
    <Route path='welcome' element={<Welcome />}> </Route>
    <Route path='chat/:id' element={<ChatArea />}> </Route>
    <Route path= 'create-group' element = {<CreateGroups />} ></Route>
    <Route path= 'users' element = {<Users />}></Route>
    <Route path= 'groups' element = {<Groups />}></Route>
    <Route path= 'settings/:id' element = {<Settings />}></Route>
    <Route path= 'add-members/:id' element = {<AddMembers />}></Route>
    <Route path= 'remove-members/:id' element = {<RemoveMembers />}></Route>
    <Route path= 'view-members/:id' element = {<ViewMembers />}></Route>
    <Route path= 'make-admin/:id' element = {<MakeAdmin />}></Route>
    <Route path= 'my-conversations' element = {<MyConversations/>}></Route>
    </Route>
  </Routes>
  
  </div>

  </>
  )
}

export default App
