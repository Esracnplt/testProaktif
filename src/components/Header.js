import React from "react"
import "../style.css"
import logo from "../img/logo.png"
import {Link} from "react-router-dom"
import data from "../language.json"
import EventBus from "js-event-bus"

var MyEventBus = EventBus()

class HoverMenuChild extends React.Component {
    render() {
        return(
            <Link to={this.props.to || "/"}>
                <div className="hover-menu-child">
                    {this.props.text}
                </div>
            </Link>
        )
    }
}

class HoverMenu extends React.Component {
    render() {
        var list = this.props.texts || []
        var mappedList = list.map((object) => 
            <HoverMenuChild to={object.to} text={object.text} key={object.text} />
        )
        return(
            <div className="hover-menu">
                {mappedList}
            </div>
        )
    }
}

class HeaderButtons extends React.Component {
    render() {
        return(
            <button className="header-button">
                {this.props.text}
            </button>
        )
    }
}
class ContactUs extends React.Component {
    render() {
        return(
            <button className="rounded-button">
                {this.props.text}
            </button>
        )
    }
}

class ChangeLanguage extends React.Component {
    constructor(props) {
        super(props)
        var language = (navigator.userLanguage || navigator.language).substring(0,2)
        this.state = {
            language:language
        }
    }
    changeFlag(component) {
        if (component.state.language === "tr") {
            component.setState({
                language:"en"
            })
        }
        else if (component.state.language === "en") {
            component.setState({
                language:"tr"
            })
        }
        MyEventBus.emit("language",null,component.state.language)
    }
    render() {
        return(
            <React.Fragment>
                <div className="flag" id="flag" onMouseDown={()=>{this.changeFlag(this)}}>
                    {(this.state.language).toUpperCase()}
                </div>
            </React.Fragment>
        )
    }
}

function HeaderMenu({ item }) {
    if (item.inside) {
        return(
            <HoverMenu texts={item.inside} />
        )
    }
    else {
        return false
    }
    
}

class Header extends React.Component {
    componentDidMount() {
        var component = this
        MyEventBus.on("language",function(msg){
            component.setState({
                language:msg
            })
        })
    }
    constructor(props) {
        super(props)
        this.state = ({
            language:((navigator.language || navigator.userLanguage).substring(0,2))
        })
    }
    render() {
        var languageObject = data[this.state.language]
        var headerButtons = [
            {text:languageObject.homeScreen},
            {text:languageObject.corporate,inside:[
                {text:languageObject.successStory}
            ]},
            {text:languageObject.products},
            {text:languageObject.projects,inside:[
                {text:languageObject.argeProjects},
                {text:languageObject.socialProjects}
            ]},
            {text:languageObject.collaborations}
        ]
        var mappedButtons = headerButtons.map((object) => 
        <div key={object.text} className="header-button-cont">
            <HeaderButtons text={object.text} />
            <HeaderMenu item={object} />
        </div>
        )
        return(
            <div className="header" id="header">
                <div id="logo" className="logo ortala">
                    <img style={{height:"60px"}} src={logo} alt="Logo"></img>
                </div>
                <div className="buttons" >
                    {mappedButtons}
                    <div className="margin">
                        <ContactUs text={languageObject.contactUs} />
                    </div>
                    <ChangeLanguage />
                </div>
            </div>
        )
    }
}

export default Header