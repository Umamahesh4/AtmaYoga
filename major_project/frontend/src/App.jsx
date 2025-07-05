import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'

import Home from './pages/home/home'
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
