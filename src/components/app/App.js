import React, {useEffect, useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../queries'
import NavBar from "../navbar/NavBar.js"
import Footer from "../footer/Footer.js"
import Home from "../home/Home.js"
import UserProfile from '../userProfile/userPofile.js'
import LoginForm from '../loginForm/LoginForm.js'
import "./App.css"

const App = () => {
    
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }

    const [token, setToken] = useState(null)
    const [me, setMe] = useState(null)
    const [loadingQuery, setLoadingQuery] = useState(true)

    const currentUserQuery = useQuery(GET_CURRENT_USER, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            console.log("user query completed", data)
            if (data.me) {
                setMe({...data.me})
            }
        }
    })

    useEffect(() => {
        console.log("token has been updated")
        setLoadingQuery(false)
        //if token exists make query to get current user's data
        return (() => {
            setLoadingQuery(true)
        })
    }, [token])



    console.log(currentUserQuery.error)
    console.log("me: ", me)

    if (loadingQuery === true) {
        return (
            <div>checking for current user</div>
        )
    }
    
    return (
        <div id="page-container">
            {/* {currentUserQuery.loading || currentUserQuery.error || !currentUserQuery.data ? <NavBar currentUser={null} /> : <NavBar currentUser={me} />} */}
            <NavBar currentUser={me} setToken={setToken} setMe={setMe} />
            {currentUserQuery.error}
            <div id="content-wrap">
                <Link to="/users/63f6c389dadc96cc795852ab">test</Link>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginForm setToken={setToken} setMe={setMe} />} />
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