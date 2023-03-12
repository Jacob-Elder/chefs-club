import React from 'react'
import {Link} from "react-router-dom"
import { useQuery } from '@apollo/client'
import {useParams} from 'react-router-dom'
import { GET_POST } from '../../queries'
import "./Post.css"

const Post = () => {
    const postId = useParams().id

    const postData = useQuery(GET_POST, {
        variables: {_id: postId}
    })
    
    if (postData.loading) {
        return <div>loading...</div>
    }
    else {
        console.log(postData.data)
    }

    return (
        <div className='post-view'>
        <h2>{postData.data.getPost.title}</h2>
        posted by <Link to={`/users/${postData.data.getPost.user._id}`}>{postData.data.getPost.user.username}</Link><br /><br />
        <h3>Ingredients:</h3>
        <ul className='list'>
            {postData.data.getPost.ingredients.map(ingredient => 
                <li key={ingredient}>
                    {ingredient}
                </li>
            )}
        </ul>
        <h3>Steps:</h3>
        <ol className='list'>
            {postData.data.getPost.steps.map(step =>
                <li key={step}>
                    {step}
                </li>
            )}
        </ol>
        <br />
        <h3>Tags:</h3>
        {postData.data.getPost.tags.map(tag => tag + ", ")}
        </div>
    )

}

export default Post