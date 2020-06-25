import React from "react"
import "../../style.css"
import {DynamicSlider,ImageSlider} from "./Sliders"
import {HashRouter,Link} from "react-router-dom"

class PageRoutes extends React.Component {
    render() {
        return (
            <div style={{height:"200px"}} className="column w200p a-center j-center f-400 margin">
                {this.props.text}
                <HashRouter>
                    <Link to={this.props.to}>
                        <button className="margin-top">{this.props.button_text}</button>
                    </Link>
                </HashRouter>
            </div>
        )
    }
}

class MainMenu extends React.Component {
    render() {
        let dynamicRoute;
        // eğer giriş yapıldıysa dashboard yapılmadıysa login butonu gelcek
        if (true) {
            dynamicRoute = <PageRoutes text="have an account?" button_text="Login" to="/login" ></PageRoutes>
        }
        return (
            <div>
                <DynamicSlider></DynamicSlider>
                <div className="w-100 a-center j-center">
                    {dynamicRoute}
                    <PageRoutes text="dont have an account?" button_text="Register" to="/register" ></PageRoutes>
                </div>
            </div>
        )
    }
}

export {MainMenu}
