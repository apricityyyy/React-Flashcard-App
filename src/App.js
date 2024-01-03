import React from 'react'
import Home from './components/Home'
import Cards from './components/Cards'
import NoMatchRoute from './components/NoMatchRoute'
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import ContactMe from './components/ContactMe'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/contact" element={<ContactMe />} />
      <Route path="/*" element={<NoMatchRoute />} />
    </Routes>
  </div>
  );
}

export default App;