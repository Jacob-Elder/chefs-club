import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../queries'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
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
        <div className='profile'>
            <h2>My Posts</h2>
            {currentUserQuery.data.me.userPosts.map(post =>
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

export default MyProfile