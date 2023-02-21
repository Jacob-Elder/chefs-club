import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache, gql} from '@apollo/client'
import App from "./App.js"
//core-js and regenerator-runtime so async/await works on older browsers (IE)
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

//create apollo client to interact with apollo server
const client = new ApolloClient({
    uri: BACKEND_URL,
    cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
)