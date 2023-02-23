import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useMutation} from "@apollo/client"
import {LOGIN} from "../../queries.js"
import "./LoginForm.css"

const LoginForm = ({setToken}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    //create login mutation that stores server response in 'result' variable
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    //save token to local storage and App component state after server responds to mutation
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("ChefsClub-Token", token)
            navigate("/", {replace: true})
        }
    }, [result.data])

    //invoke the login mutation with the email and password entered by the user
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("deez be the values entered: ", email, password)
        login({variables: {email, password}})
    }

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                Email: <input type="text" name="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                Password: <input type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                <button type="submit">login</button>
            </form>
            <p>{error}</p>
        </div>
    )
}

export default LoginForm