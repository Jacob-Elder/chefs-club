import React from 'react'
import "./PostList.css"

const PostList = ({posts}) => {
    return (
        <div className='list'>
        {posts.map(post =>
            <div className='post' key={post._id}>
                Title: {post.title}<br />
                Ingredients:
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
                </ol>
                Tags: {post.tags.toString()}
            </div>
        )}
        </div>
    )
}

export default PostList