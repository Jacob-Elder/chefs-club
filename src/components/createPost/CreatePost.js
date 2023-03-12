import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom/client'
import {useNavigate, Link} from 'react-router-dom'
import {useMutation} from "@apollo/client"
import {CREATE_POST} from "../../queries.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import "./CreatePost.css"
import ErrorMessage from '../errorMessage/ErrorMessage.js'

const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [ingredientList, setIngredientList] = useState([{ingredient: ''}])
    const [stepList, setStepList] = useState([{step: ''}])
    const [tagList, setTagList] = useState([{tag: ''}])
    const [error, setError] = useState("")

    const navigate = useNavigate()

    //create mutation to execute addPost
    const [addPost, addPostResult] = useMutation(CREATE_POST, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            console.log(error)
            setError(error.graphQLErrors[0].message)
        }
    })

    //perform necessary actions after appPost mutation returns
    useEffect(() => {
        console.log("addPost useEffect hit")
        if (addPostResult.data) {
            console.log("addPost mutation complete", addPostResult.data)
            //navigate to the post's page
            navigate(`/posts/${addPostResult.data.addPost._id}`, {replace: true})
        }
    }, [addPostResult.data])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("title: ", title)
        const ingredients = ingredientList.map(item => item.ingredient)
        console.log("ingredients array: ", ingredients)
        const steps = stepList.map(item => item.step)
        console.log("steps array: ", steps)
        const tags = tagList.map(item => item.tag)
        console.log("tags array: ", tags)
        addPost({variables: {title, ingredients, steps, tags}})
    }

    //helper functions for ingredient list
    const addIngredientInput = () => {
        setIngredientList([...ingredientList, {ingredient: ''}])
    }

    const removeIngredientInput = (index) => {
        const newList = [...ingredientList]
        newList.splice(index, 1)
        setIngredientList(newList)
    }

    const handleIngredientChange = (e, index) => {
        const {name, value} = e.target
        const newList = [...ingredientList]
        newList[index][name] = value
        setIngredientList(newList)
    }

    //helper functions for step list
    const addStepInput = () => {
        setStepList([...stepList, {step: ''}])
    }

    const removeStepInput = (index) => {
        const newList = [...stepList]
        newList.splice(index, 1)
        setStepList(newList)
    }

    const handleStepChange = (e, index) => {
        const {name, value} = e.target
        const newList = [...stepList]
        newList[index][name] = value
        setStepList(newList)
    }

    //helper functions for tag list
    const addTagInput = () => {
        setTagList([...tagList, {tag: ''}])
    }

    const removeTagInput = (index) => {
        const newList = [...tagList]
        newList.splice(index, 1)
        setTagList(newList)
    }

    const handleTagChange = (e, index) => {
        const {name, value} = e.target
        const newList = [...tagList]
        newList[index][name] = value
        setTagList(newList)
    }

    return (
        <div className='createPost'>
            <h2>Create New Post</h2>
            <br />
            <form onSubmit={handleSubmit}>
                Title: <input type="text" name="title" value={title} onChange={(event) => {setTitle(event.target.value)}} /><br />
                Ingredients:<br />
                <div className='formBox'>
                    <div id='ingredientInputs'>
                        {ingredientList.map((singleIngredient, index) => (
                            <div key={index}>
                                <input name="ingredient" type="text" value={singleIngredient.ingredient} onChange={(e) => {handleIngredientChange(e, index)}} required />
                                {ingredientList.length > 1 && (
                                    <button onClick={() => removeIngredientInput(index)}>remove</button>
                                )}
                            </div>  
                        ))}
                    </div>
                    <FontAwesomeIcon size="2x" icon={faPlusCircle} className="plus" onClick={addIngredientInput} />
                </div>
                Steps:<br/>
                <div className='formBox'>
                    <div id='stepInputs'>
                        {stepList.map((singleStep, index) => (
                            <div key={index}>
                                <input name="step" type="text" value={singleStep.step} onChange={(e) => {handleStepChange(e, index)}} required />
                                {stepList.length > 1 && (
                                    <button onClick={() => removeStepInput(index)}>remove</button>
                                )}
                            </div>  
                        ))}
                    </div>
                    <FontAwesomeIcon size="2x" icon={faPlusCircle} className="plus" onClick={addStepInput} />
                </div>
                Tags:<br/>
                <div className='formBox'>
                    <div id='tagInputs'>
                        {tagList.map((singleTag, index) => (
                            <div key={index}>
                                <input name="tag" type="text" value={singleTag.tag} onChange={(e) => {handleTagChange(e, index)}} required />
                                {tagList.length > 1 && (
                                    <button onClick={() => removeTagInput(index)}>remove</button>
                                )}
                            </div>  
                        ))}
                    </div>
                    <FontAwesomeIcon size="2x" icon={faPlusCircle} className="plus" onClick={addTagInput} />
                </div>
                <br />
                <button type="submit">Create Post</button>
            </form>
            {error !== "" ? <ErrorMessage message={error} /> : null}
        </div>
    )

}

export default CreatePost