import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from "./App.js"
//core-js and regenerator-runtime so async/await works on older browsers (IE)
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)