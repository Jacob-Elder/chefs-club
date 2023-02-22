import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_POSTS } from '../../queries'
import "./Home.css"

const PostList = ({posts}) => {
    console.log("passed to PostList: ", posts)
    return (
        posts.map(post => 
            <div key={post._id}>
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
        )
    )
}

const Home = () => {

    const posts = useQuery(ALL_POSTS)
    
    if (posts.loading) {
        return <div>loading...</div>
    }

    return (
        <div className="home">
            <h2>This is the homepage</h2>
            <PostList posts={posts.data.allPosts} />
        </div>
    )
}

export default Home