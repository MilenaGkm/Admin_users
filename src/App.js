import React, { Fragment } from "react"
import Header from "./containers/Header/Header";
import Modals from "./containers/Modals/Modals";
import NavBar from "./containers/NavBar/NavBar";
import './App.css';

function App() {

    return (
        <Fragment>
            <Header />
            <NavBar />
            <Modals />  
        </Fragment>
    )
}

export default App