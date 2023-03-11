import React from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import "./PostList.css"

const PostList = ({posts}) => {
    return (
        <div className='list'>
        {posts.map(post =>
            <div className='post' key={post._id}>
                <div>
                    <FontAwesomeIcon size="2x" icon={faThumbsUp} className="thumb" /><br />
                    {post.likes}
                </div>
                <div>
                    <Link to={`/posts/${post._id}`}  className="link">{post.title}</Link><br />
                    posted by: <Link to={`/users/${post.user._id}`}>{post.user.username}</Link>
                </div>
                <div></div>
            </div>
        )}
        </div>
    )
}

export default PostList