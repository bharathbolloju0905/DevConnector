import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import {UserContextProvider} from './Context/UserContext.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <BrowserRouter>
      <UserContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
