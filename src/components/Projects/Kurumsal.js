import React from "react";
import Header from "../Header"
import ProjectTemplate from "./ProjectTemplate";

class KurumsalComponent extends React.Component {
    render() {
        return (
            <div>
                <ProjectTemplate projectName="corporate" />
            </div>
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