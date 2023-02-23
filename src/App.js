import React, {useState} from 'react'
import {Routes, Route, Navigate, Link } from 'react-router-dom'
import NavBar from "./components/navbar/NavBar.js"
import Footer from "./components/footer/Footer.js"
import Home from "./components/home/Home.js"
import UserProfile from './components/userProfile/userPofile.js'
import LoginForm from './components/LoginForm/LoginForm.js'

const App = () => {
    //use polyfill so promises work on older browsers (IE)
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }

    const [token, setToken] = useState(null)
    
    return (
        <>
        <NavBar />
        <Link to="/users/63f6c389dadc96cc795852ab">test</Link>
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm setToken={setToken} />} />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
        <Footer />
        </>
    )
}


export default App