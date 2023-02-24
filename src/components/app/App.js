import React, {useState} from 'react'
import {Routes, Route, Navigate, Link } from 'react-router-dom'
import NavBar from "../navbar/NavBar.js"
import Footer from "../footer/Footer.js"
import Home from "../home/Home.js"
import UserProfile from '../userProfile/userPofile.js'
import LoginForm from '../loginForm/LoginForm.js'
import "./App.css"

const App = () => {
    //use polyfill so promises work on older browsers (IE)
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }

    const [token, setToken] = useState(null)
    
    return (
        <div id="page-container">
            <NavBar />
            <Link to="/users/63f6c389dadc96cc795852ab">test</Link>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm setToken={setToken} />} />
                    <Route path="/signup" element={<h2>Sign Up</h2>} />
                    <Route path="/users/:id" element={<UserProfile />} />
                    <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}


export default App