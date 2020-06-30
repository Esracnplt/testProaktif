import React from "react"
import "../style.css"
import logo from "../img/logo.png"
import {Link} from "react-router-dom"

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
            <button className="rounded-button">İletişim</button>
        )
    }
}

class ChangeLanguage extends React.Component {
    constructor(props) {
        super(props)
        var language = navigator.userLanguage || navigator.language
        this.state = {
            language:language
        }
    }
    changeFlag(component) {
        if (component.state.language === "tr") {
            this.setState({
                language:"en"
            })
        }
        else {
            this.setState({
                language:"tr"
            })
        }
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
    render() {
        var headerButtons = [
            {text:"Anasayfa"},
            {text:"Kurumsal",inside:[
                {text:"Başarı Hikayemiz"}
            ]},
            {text:"Ürünlerimiz"},
            {text:"Projelerimiz",inside:[
                {text:"Ar-Ge Projelerimiz"},
                {text:"Sosyal Sorumluluk Projelerimiz"}
            ]},
            {text:"İş Birliklerimiz"}
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
                        <ContactUs></ContactUs>
                    </div>
                    <div className="margin">
                        <ChangeLanguage></ChangeLanguage>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header