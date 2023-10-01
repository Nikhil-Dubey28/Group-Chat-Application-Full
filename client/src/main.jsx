import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GroupProvider } from './Components/GroupContext/GroupContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <GroupProvider>
    <App />
    </GroupProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
