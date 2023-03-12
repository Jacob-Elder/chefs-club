import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom/client'
import {useLazyQuery} from "@apollo/client"
import {SEARCH_POSTS_BY_TAG} from "../../queries.js"
import "./Search.css"
import PostList from "../postList/PostList.js"
import ErrorMessage from '../errorMessage/ErrorMessage.js'

const Search = ({currentUser}) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [error, setError] = useState(null)

    //create query to execute search
    const [searchPosts, searchPostsResult] = useLazyQuery(SEARCH_POSTS_BY_TAG, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            console.log(error)
            setError(error.graphQLErrors[0].message)
        }
    })

    //perform necessary actions after search mutation
    useEffect(() => {
        if (searchPostsResult.data) {
            console.log("searchPosts query complete", searchPostsResult.data)
            setSearchResults(searchPostsResult.data.searchPosts)
            if (searchPostsResult.data.searchPosts.length === 0) {
                setError("No posts found")
            }
        }
    }, [searchPostsResult.data])

    const handleSearch = (event) => {
        event.preventDefault()
        setError(null)
        searchPosts({variables: {tag: searchTerm}})
    }


    return (
        <div className='search'>
            <h2>Search</h2>
            <form onSubmit={handleSearch}>
                Search by Tag: <input type="text" name="searchTerm" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} required />
                <button type="submit">Find</button>
            </form>
            {error !== "" ? <ErrorMessage message={error} /> : null}
            <PostList posts={searchResults} currentUser={currentUser} />
        </div>
    )

}

export default Search