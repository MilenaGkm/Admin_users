import React, { Fragment } from "react"

function Header() {


    return (
        <Fragment>
            <h2>Admin user app</h2>
            <h3>Date : {new Date().toDateString()}</h3>
        </Fragment>
    )
}

export default Header