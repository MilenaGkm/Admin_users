import React, { Fragment } from "react"
import Users from './containers/Users/Users'
import Msgs from './containers/Msgs/Msgs'
import Header from "./containers/Header/Header";
import Modals from "./containers/Modals/Modals";
import Schedule from './containers/Schedule/Schedule'
import './App.css';

function App() {

    return (
        <Fragment>
            <Header />
            <Users />
            <Schedule />
            <Modals />  
            <Msgs />
        </Fragment>
    )
}

export default App