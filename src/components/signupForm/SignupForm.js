import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useMutation, useLazyQuery} from "@apollo/client"
import {LOGIN, GET_CURRENT_USER} from "../../queries.js"
import "./SignupForm.css"
import ErrorMessage from '../errorMessage/ErrorMessage.js'

const SignupForm = ({setToken, setMe}) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [tempToken, setTempToken] = useState(null)

    //query to get user data after after generating token
    const [getUserData, currentUserQuery] = useLazyQuery(GET_CURRENT_USER, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            console.log("login form got user data", data)
            if (data.me) {
                setMe({...data.me})
            }
        }
    })

    //create login mutation that stores server response in 'result' variable
    const [login, result] = useMutation(LOGIN, {
        onCompleted: (data) => {
            console.log("login mutation complete", data)
        },
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    //save token to local storage and App component state after server responds to mutation
    useEffect(() => {
        console.log("login useEffect hit")
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            console.log("saving token to localstorage: ", token)
            localStorage.setItem("ChefsClub-Token", token)
            navigate("/", {replace: true})
        }
    }, [result.data])

    //invoke the login mutation with the email and password entered by the user
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("deez be the values entered: ", email, password)
        login({variables: {email, password}})
    }

    return (
        <div>
            <h2>Create Profile</h2>
            <form onSubmit={handleSubmit}>
                Email: <input type="text" name="email" value={email} onChange={(event) => {setEmail(event.target.value)}} /><br />
                Username: <input type="text" name="username" value={username} onChange={(event) => {setUsername(event.target.value)}} /><br />
                Password: <input type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value)}} /><br />
                <button type="submit">Submit</button>
            </form>
            {error !== "" ? <ErrorMessage message={error} /> : null}
            Already have an account? <Link to="/login">Login</Link>
        </div>
    )
}

export default SignupForm