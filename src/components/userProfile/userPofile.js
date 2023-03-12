import React from 'react'
import { useQuery } from '@apollo/client'
import {useParams} from 'react-router-dom'
import { GET_USER_PROFILE } from '../../queries'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
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
        <div className='profile'>
            <h2>{userData.data.getUserData.username}'s Profile</h2>
            {userData.data.getUserData.userPosts.map(post =>
                <div className='post' key={post._id}>
                    <div>
                        <FontAwesomeIcon size="2x" icon={faThumbsUp} className="thumb" /><br />
                        {post.likes}
                    </div>
                    <div>
                        <Link to={`/posts/${post._id}`}  className="link">{post.title}</Link><br />
                    </div>
                    <div></div>
                </div>
            )}
        </div>
    )

}

export default userProfile