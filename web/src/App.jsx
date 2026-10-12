import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home';
import Form from './Form'

function App() {
  

  return (
    <div>
      <h1>My App Page</h1>

      <Form/>

      <Home/>
    </div>
   
  )
}

export default App
