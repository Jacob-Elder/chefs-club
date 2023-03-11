import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../queries'
import "./MyProfile.css"

const MyProfile = () => {

    const currentUserQuery = useQuery(GET_CURRENT_USER, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            console.log("user query completed", data)
        }
    }, [])
    
    if (currentUserQuery.loading) {
        return <div>loading...</div>
    }
    else {
        console.log(currentUserQuery.data)
    }

    return (
        <h2>{currentUserQuery.data.me.username}</h2>
    )

}

export default MyProfile