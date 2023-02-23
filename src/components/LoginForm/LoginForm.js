import React, {useState} from 'react'
import "./LoginForm.css"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("deez be the values entered: ", email, password)
    }

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                Email: <input type="text" name="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
                Password: <input type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm