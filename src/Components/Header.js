import React from "react"
import "../style.css"
import {NavLink,HashRouter} from "react-router-dom"

class Header extends React.Component {
    render() {
        return (
            <div id="header" style={{backgroundColor:this.props.bg?this.props.bg:"white"}} className="menu-header w-100">
                <div className="margin f-700"> {this.props.text} </div>
                <HashRouter>
                    <NavLink to={this.props.send}>
                        <button className="reverse"> {this.props.button_text} </button>
                    </NavLink>
                </HashRouter>
            </div>
        )
    }
}
export {Header}