import React, {useState} from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from "./components/home/Home.js"
import NavBar from "./components/navbar/NavBar.js"
import Footer from "./components/footer/Footer.js"

const App = () => {
    //use polyfill so promises work on older browsers (IE)
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }
    
    return (
        <>
        <NavBar />
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
        <Footer />
        </>
    )
}


export default App