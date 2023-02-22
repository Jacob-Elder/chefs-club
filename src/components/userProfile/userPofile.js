import React from 'react'
import { useQuery } from '@apollo/client'
import {useParams} from 'react-router-dom'
import { GET_USER_PROFILE } from '../../queries'
import "./userProfile.css"

const userProfile = () => {
    const userId = useParams().id

    const userData = useQuery(GET_USER_PROFILE, {
        variables: {_id: userId}
    })
    
    if (userData.loading) {
        return <div>loading...</div>
    }
    else {
        console.log(userData.data)
    }

    return (
        <h2>{userData.data.getUserData.username}'s Profile</h2>
    )

}

export default userProfile