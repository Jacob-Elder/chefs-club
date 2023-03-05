import React from 'react'
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
        <>
        <h2>{postData.data.getPost.title}'s Profile</h2>
        Ingredients:
        <ul>
            {postData.data.getPost.ingredients.map(ingredient => 
                <li key={ingredient}>
                    {ingredient}
                </li>
            )}
        </ul>
        Steps:
        <ol>
            {postData.data.getPost.steps.map(step =>
                <li key={step}>
                    {step}
                </li>
            )}
        </ol>
        </>
    )

}

export default Post