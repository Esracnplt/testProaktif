import React from "react";
import "../style.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import data from "../language.json";
import EventBus from "js-event-bus";

export var MyEventBus = EventBus();

export function getDefaultLang() {
  return (navigator.language || navigator.userLanguage).substring(0, 2)
}

function HoverMenuChild({ item }) {
  var button = <div className="hover-menu-child">{item.text}</div>;
  if (item.to) {
    return <Link to={item.to}>{button}</Link>;
  } else {
    return <div>{button}</div>;
  }
}

function HoverMenu({ item }) {
  var mappedList = item.map((object) => (
    <HoverMenuChild key={object.text} item={object} />
  ));
  return <div className="hover-menu">{mappedList}</div>;
}

function HeaderButtons({ item }) {
  var headerButton = <button className="header-button">{item.text}</button>;
  if (item.to) {
    return <Link to={item.to}>{headerButton}</Link>;
  } else {
    return <div>{headerButton}</div>;
  }
}

class ContactUs extends React.Component {
  render() {
    return (
      <Link to="/contact">
        <button className="rounded-button">{this.props.text}</button>
      </Link>
    );
  }
}

class ChangeLanguage extends React.Component {
  constructor(props) {
    super(props);
    var language = getDefaultLang()
    this.state = {
      language: language,
    };
  }
  changeFlag(component) {
    var currentLanguage = (
      navigator.userLanguage || navigator.language
    ).substring(0, 2);
    if (component.state.language === "tr") {
      component.setState({
        language: "en",
      });
      currentLanguage = "en";
    } else if (component.state.language === "en") {
      component.setState({
        language: "tr",
      });
      currentLanguage = "tr";
    }
    MyEventBus.emit("language", null, currentLanguage);
  }
  render() {
    return (
      <React.Fragment>
        <div
          className="flag"
          id="flag"
          onMouseDown={() => {
            this.changeFlag(this);
          }}
        >
          {this.state.language.toUpperCase()}
        </div>
      </React.Fragment>
    );
  }
}

function HeaderMenu({ item }) {
  if (item.inside) {
    return <HoverMenu item={item.inside} />;
  } else {
    return false;
  }
}

class Header extends React.Component {
  componentWillUnmount() {
    //link değişince header yine olsada aslında başka bir tane olacağı için eventları kapatıyor bu sayede ramden tasarruf ediyor.
    MyEventBus.detachAll();
  }
  componentDidMount() {
    var component = this;
    MyEventBus.on("language", function (msg) {
      component.setState({
        language: msg,
      });
    });
  }
  changeHamburger(component) {
    if (component.state.hamburgerOpen) {
      component.setState({
        hamburgerOpen: false,
      });
      document.querySelector("html").classList.remove("of-y-hidden")
      document.querySelector(".other-buttons").classList.remove("visible")
      document
        .getElementById("hamburger-part1")
        .classList.remove("hamburger-open");
      document
        .getElementById("hamburger-part2")
        .classList.remove("hamburger-open");
      document
        .getElementById("hamburger-part3")
        .classList.remove("hamburger-open");
    } else {
      component.setState({
        hamburgerOpen: true,
      });
      document.querySelector("html").classList.add("of-y-hidden")
      document.querySelector(".other-buttons").classList.add("visible")
      document
        .getElementById("hamburger-part1")
        .classList.add("hamburger-open");
      document
        .getElementById("hamburger-part2")
        .classList.add("hamburger-open");
      document
        .getElementById("hamburger-part3")
        .classList.add("hamburger-open");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      language: getDefaultLang(),
      hamburgerOpen: false,
    };
    MyEventBus.emit("language", null, this.state.language);
  }
  render() {
    var languageObject = data[this.state.language].header;
    var headerButtons = [
      { text: languageObject.homeScreen, to: "/" },
      {
        text: languageObject.corporate, to:"/corporate"
      },
      { text: languageObject.products, to:"/products" },
      {
        text: languageObject.projects,
        inside: [
          { text: languageObject.argeProjects, to: "/argeprojects" },
          { text: languageObject.socialProjects, to: "/socialprojects" },
        ],
      },
      { text: languageObject.collaborations, to:"/collabrations" },
    ];
    var mappedButtons = headerButtons.map((object) => (
      <div key={object.text} className="header-button-cont">
        <HeaderButtons item={object} />
        <HeaderMenu item={object} />
      </div>
    ));
    var buttons = <div className="buttons">
      {mappedButtons}
      <div className="margin">
        <ContactUs text={languageObject.contactUs} />
      </div>
    </div>
    return (
      <React.Fragment>
        <div className="header" id="header">
          <Link style={{"display":"flex","alignItems":"center"}} to="/">
            <div id="logo" className="logo ortala">
              <img style={{ height: "60px" }} src={logo} alt="Logo"></img>
            </div>
            <div style={{"color":"white","fontWeight":"700","letterSpacing":"3px"}}>
              PROAKTİF
            </div>
          </Link>
          <div
            className="hamburger"
            onMouseDown={() => {
              this.changeHamburger(this);
            }}
          >
            <svg
              viewBox="0 0 100 80"
              width="40"
              height="40"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <rect id="hamburger-part1" rx="5" width="100" height="20"></rect>
              <rect id="hamburger-part2" rx="5" y="30" width="100" height="20"></rect>
              <rect id="hamburger-part3" rx="5" y="60" width="100" height="20"></rect>
            </svg>
          </div>
          {buttons}
          <ChangeLanguage />
        </div>
        <div className="other-buttons">
            {buttons}
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
