import React from 'react'
import "./PostList.css"

const PostList = ({posts}) => {
    return (
        <div className='list'>
        {posts.map(post =>
            <div className='post' key={post._id}>
                <h2>{post.title}</h2>
                Likes: {post.likes}<br />
                Tags: {post.tags.toString()}
                {/* Ingredients:
                <ul>
                    {post.ingredients.map(ingredient => 
                        <li key={ingredient}>
                            {ingredient}
                        </li>
                    )}
                </ul>
                Steps:
                <ol>
                    {post.steps.map(step =>
                        <li key={step}>
                            {step}
                        </li>
                    )}
                </ol> */}
            </div>
        )}
        </div>
    )
}

export default PostList