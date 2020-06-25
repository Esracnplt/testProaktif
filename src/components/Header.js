import React from "react"
import "../style.css"
import logo from "../img/logo.png"

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
        this.state = {
            language:(navigator.language || navigator.userLanguage)
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

class Header extends React.Component {
    componentDidMount() {
        
    }
    render() {
        return(
            <div className="header" id="header">
                <div id="logo" className="logo ortala">
                    <img style={{height:"60px"}} src={logo} alt="Logo"></img>
                </div>
                <div className="buttons" >
                    <HeaderButtons text="Anasayfa"></HeaderButtons>
                    <HeaderButtons text="Kurumsal"></HeaderButtons>
                    <HeaderButtons text="Ürünlerimiz"></HeaderButtons>
                    <HeaderButtons text="Projelerimiz"></HeaderButtons>
                    <HeaderButtons text="İş Birliklerimiz"></HeaderButtons>
                    <HeaderButtons text="Başarı Hikayemiz"></HeaderButtons>
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