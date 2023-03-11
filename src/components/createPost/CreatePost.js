import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useMutation, useLazyQuery} from "@apollo/client"
import {LOGIN, GET_CURRENT_USER} from "../../queries.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import "./CreatePost.css"
import ErrorMessage from '../errorMessage/ErrorMessage.js'

const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const [tags, setTags] = useState([])
    const [error, setError] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("creating post")
    }

    return (
        <div className='createPost'>
            <h2>Create New Post</h2>
            <br />
            <form onSubmit={handleSubmit}>
                Title: <input type="text" name="title" value={title} onChange={(event) => {setTitle(event.target.value)}} /><br />
                Ingredients:<br />
                <div className='formBox'>
                    <input type="text" name="ingredient" /><br /><br />
                    <FontAwesomeIcon size="2x" icon={faPlusCircle} className="plus" />
                </div>
                Steps:<br/>
                <div className='formBox'>
                    <input type="text" name="ingredient" /><br /><br />
                    <FontAwesomeIcon size="2x" icon={faPlusCircle} className="plus" />
                </div>
                Tags:<br/>
                <div className='formBox'>
                    <input type="text" name="ingredient" /><br /><br />
                    <FontAwesomeIcon size="2x" icon={faPlusCircle} className="plus" />
                </div>
                <br />
                <button type="submit">Create Post</button>
            </form>
            {error !== "" ? <ErrorMessage message={error} /> : null}
        </div>
    )

}

export default CreatePost