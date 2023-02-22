import React, {useState} from 'react'
import {Routes, Route, Navigate, Link } from 'react-router-dom'
import NavBar from "./components/navbar/NavBar.js"
import Footer from "./components/footer/Footer.js"
import Home from "./components/home/Home.js"
import UserProfile from './components/userProfile/userPofile.js'

const App = () => {
    //use polyfill so promises work on older browsers (IE)
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }
    
    return (
        <>
        <NavBar />
        <Link to="/users/63f58ac8e5d5eb0478b47611">test</Link>
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
        <Footer />
        </>
    )
}


export default App