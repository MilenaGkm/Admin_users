import React, { Fragment } from "react"
import Users from './containers/Users/Users'
import Msgs from './containers/Msgs/Msgs'
import Header from "./containers/Header/Header";
import Modals from "./containers/Modals/Modals";
import NewUserBtn from "./containers/AddUser/AddUser"

import './App.css';

function App() {

    return (
        <Fragment>
            <Header />
            <Users />
            <Modals />  
            <Msgs />
            {/* <NewUserBtn />           */}
        </Fragment>
    )
}

export default App