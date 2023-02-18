import React, {useState} from 'react'
import './css/index.css'

const App = () => {
    const [counter, setCounter] = useState(0)
    return (
        <div className="container">
            hello world<br />
            count: {counter}<br />
            <button onClick={() => {setCounter(counter + 1)}}>add 1</button>
        </div>
    )
}

export default App