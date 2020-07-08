import React from "react"
import Header from "../Header"
import ProjectTemplate from "./ProjectTemplate"

class CollabrationsComp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ProjectTemplate projectName="collabrations" />
            </React.Fragment>
        )
    }
}

export default class Collabrations extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="body">
                    <CollabrationsComp />
                </div>
            </div>
        )
    }
}