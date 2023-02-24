import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from "@apollo/client/link/context"
import App from "./components/app/App.js"
//core-js and regenerator-runtime so async/await works on older browsers (IE)
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

//web token stored in local storage should be passed to the server with each request
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("ChefsClub-Token")
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
})

//httpLink allows headers (such as authorization) to be sent from the client
const httpLink = createHttpLink({
    uri: BACKEND_URL
})

//create apollo client to interact with apollo server
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
)