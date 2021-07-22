import React, { Fragment } from "react"
import Users from './containers/Users/Users'
import Header from "./containers/Header/Header";
import Modals from "./containers/Modals/Modals";

import './App.css';

function App() {

    return (
        <Fragment>
            <Header />
            <Users />
            <Modals />            
        </Fragment>
    )
}

export default App