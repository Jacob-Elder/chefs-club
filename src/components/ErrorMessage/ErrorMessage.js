import React from 'react'
import "./ErrorMessage.css"

const ErrorMessage = ({message}) => {
    return (
        <div className='message'>
            {message}
        </div>
    )
}

export default ErrorMessage