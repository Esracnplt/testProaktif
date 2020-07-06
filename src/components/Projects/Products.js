import React from "react"
import Header from "../Header"
import ProjectTemplate from "./ProjectTemplate"

class ProductComponent extends React.Component {
    render() {
        return (
            <div>
                <ProjectTemplate projectName="products" />
            </div>
        )
    }
}

class Products extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="body">
                    <ProductComponent />
                </div>
            </div>
        )
    }
}

export default Products