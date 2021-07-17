import React from "react"
import Users from './containers/Users/Users'
import './App.css';

function App() {
    return (
        <div>
            <h2>Admin user app</h2>
            <h3>Date : {new Date().toDateString()}</h3>
            <Users />
        </div>
    )
}

export default App