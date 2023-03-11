import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split} from '@apollo/client'
import {setContext} from "@apollo/client/link/context"
//import dependencies needed for subscriptions
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import App from "./components/app/App.js"
//core-js and regenerator-runtime so async/await works on older browsers (IE)
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

//web token stored in local storage should be passed to the server with each request
const authLink = setContext( async (_, { headers }) => {
    const token = await localStorage.getItem("ChefsClub-Token")
    console.log("this is the token", token)
    return {
        headers: {
            ...headers,
            //authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphY29iZWxkZXJvbmx5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiamVsZGVyOTYiLCJfaWQiOiI2M2Y2YzM4OWRhZGM5NmNjNzk1ODUyYWIiLCJpYXQiOjE2NzcxOTM2MDl9.p91t5IHzgYEIM3LRbZhabs3DiZeekSUDUAnpJsXJ344`,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
})

//httpLink allows headers (such as authorization) to be sent from the client
const httpLink = createHttpLink({
    uri: BACKEND_URL
})
console.log("this is the backend url", BACKEND_URL)
//websocket url is same as backend url but with "ws" instead of "http"
const WS_URL = BACKEND_URL.replace("http", "ws")

const wsLink = new GraphQLWsLink(
createClient({ url: WS_URL })
)

//app must have both an http and a WebSocket connection to the GraphQL server
const splitLink = split(
({ query }) => {
    const definition = getMainDefinition(query)
    return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
    )
},
wsLink,
authLink.concat(httpLink)
)

//create apollo client to interact with apollo server
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
)