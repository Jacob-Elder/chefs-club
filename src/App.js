import React, {useState} from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from "./components/home/Home.js"
import NavBar from "./components/navbar/NavBar.js"

const App = () => {
    
    return (
        <div className="container">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
    )
}


export default App