import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import './styles/globalstyles.scss'
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
   

)
