import React from "react"
import "../../style.css"
import {Header} from "../Header"
import {Navbar} from "./Navbar"

class Dashboard extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Header text="nevermind. that button makes nevermind" button_text="empty button" send="/dashboard"></Header>
                <div style={{height:"100%"}}>
                    <Navbar></Navbar>

                    <div className="h100">Hello</div>

                </div>
            </React.Fragment>
        )
    }
}

export {Dashboard}