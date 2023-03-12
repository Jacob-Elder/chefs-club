import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useMutation, useLazyQuery} from "@apollo/client"
import {LOGIN, CREATE_USER, GET_CURRENT_USER} from "../../queries.js"
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

    //addUser mutation that stores server response in 'signupResult' variable
    const [signup, signupResult] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            //console.log(data)
        },
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    //perform neccessary actions after signup mutation
    useEffect(() => {
        if (signupResult.data) {
            console.log("server response from signup mutation: ", signupResult.data)
            //set current user state in App component
            setMe(signupResult.data.addUser)
            //invoke login mutation to get token
            login({variables: {email, password}})
        }
    }, [signupResult.data])

    //create login mutation that stores server response in 'result' variable
    const [login, result] = useMutation(LOGIN, {
        onCompleted: (data) => {
            console.log("login mutation complete", data)
        },
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    //async function to save token to local storage after login
    const loginHelper = async () => {
        const token = result.data.login.value
        setToken(token)
        console.log("saving token to localstorage: ", token)
        await localStorage.setItem("ChefsClub-Token", token)
        navigate("/", {replace: true})
    }

    //save token to local storage and App component state after server responds to mutation
    useEffect(() => {
        if (result.data) {
            loginHelper()
        }
        return () => {
            //cleanup
        }
    }, [result.data])


    //invoke the login mutation with the email and password entered by the user
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("deez be the values entered: ", email, username, password)
        signup({variables: {email, username, password}})
    }

    return (
        <div className='signup'>
            <h2>Create Profile</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Email:</td>
                        <td><input type="text" name="email" value={email} onChange={(event) => {setEmail(event.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>Username:</td>
                        <td><input type="text" name="username" value={username} onChange={(event) => {setUsername(event.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value)}} /></td>
                    </tr>
                    </tbody>
                </table>
                {/* Email: <input type="text" name="email" value={email} onChange={(event) => {setEmail(event.target.value)}} /><br />
                Username: <input type="text" name="username" value={username} onChange={(event) => {setUsername(event.target.value)}} /><br />
                Password: <input type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value)}} /><br /> */}
                <button type="submit">Signup</button>
            </form>
            {error !== "" ? <ErrorMessage message={error} /> : null}
            Already have an account? <Link to="/login">Login</Link>
        </div>
    )
}

export default SignupForm