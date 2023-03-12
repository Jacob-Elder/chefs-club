import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
import {useMutation} from "@apollo/client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import "./PostList.css"
import { LIKE_POST, GET_CURRENT_USER, TOP_AND_NEW_POSTS } from '../../queries'


const PostList = ({posts, currentUser}) => {

    //create mutation to like a post
    const [likePost, likePostResult] = useMutation(LIKE_POST, {
        refetchQueries: [
            {query: GET_CURRENT_USER},
            {query: TOP_AND_NEW_POSTS}
        ],
        onError: (error) => {
            console.log(error)
            setError(error.graphQLErrors[0].message)
        }
    })

    //perform necessary actions after appPost mutation returns
    useEffect(() => {
        if (likePostResult.data) {
            console.log("likePost mutation complete", likePostResult.data)
        }
    }, [likePostResult.data])

    const likeHandler = (id) => {
        if (!currentUser) {
            alert("You must login to like a post")
            return
        }
        if (currentUser.likedPosts.includes(id)) {
            alert("You have already liked this post")
            return
        }
        likePost({variables: {_id : id}})
    }

    return (
        <div className='list'>
        {posts.map(post =>
            <div className='post' key={post._id}>
                <div>
                    <FontAwesomeIcon size="2x" icon={faThumbsUp} className={currentUser?.likedPosts.includes(post._id) ? 'green-thumb' : 'thumb'} onClick={() => likeHandler(post._id)} /><br />
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