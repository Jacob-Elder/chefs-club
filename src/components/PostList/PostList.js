import React from 'react'
import {Link} from "react-router-dom"
import "./PostList.css"

const PostList = ({posts}) => {
    return (
        <div className='list'>
        {posts.map(post =>
            <div className='post' key={post._id}>
                <Link to={`/posts/${post._id}`}><h2>{post.title}</h2></Link>
                Likes: {post.likes}<br />
                Tags: {post.tags.toString()}
            </div>
        )}
        </div>
    )
}

export default PostList