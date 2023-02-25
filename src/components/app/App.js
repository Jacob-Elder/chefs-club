import React, {useEffect, useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../queries'
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
    const [me, setMe] = useState(null)

    const currentUserQuery = useQuery(GET_CURRENT_USER, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            console.log("user query completed", data)
            if (data.me) {
                setMe(data.me)
            }
        }
    }, [token, me])
    
    return (
        <div id="page-container">
            {/* {currentUserQuery.loading || currentUserQuery.error ? <NavBar currentUser={null} />  : <NavBar currentUser={currentUser} />} */}
            <NavBar currentUser={me} key={me} />
            <div id="content-wrap">
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
            </div>
            <Footer />
        </div>
    )
}


export default App