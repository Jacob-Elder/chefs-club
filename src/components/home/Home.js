import React from 'react'
import { useQuery } from '@apollo/client'
import { TOP_AND_NEW_POSTS } from '../../queries'
import "./Home.css"
import PostList from "../postList/PostList.js"

const Home = () => {

    const posts = useQuery(TOP_AND_NEW_POSTS)
    
    if (posts.loading) {
        return <div>loading...</div>
    }

    return (
        <div className="home">
            <h2>Most Liked Recipes</h2>
            <PostList posts={posts.data.topPosts} />
            <h2>Newly Posted Recipes</h2>
            <PostList posts={posts.data.newPosts} />
        </div>
    )
}

export default Home