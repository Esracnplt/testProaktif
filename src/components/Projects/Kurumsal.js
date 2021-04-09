import React from "react";
import Header from "../Header"
import ProjectTemplate from "./ProjectTemplate";

class KurumsalComponent extends React.Component {
    render() {
        return (
            <>
                <ProjectTemplate  projectName="corporate" />
            </>
        )
    }
}

class Kurumsal extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="body">
                    <KurumsalComponent />
                </div>
            </div>
        )
    }
}

export default Kurumsal