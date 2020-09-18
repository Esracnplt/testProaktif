/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom"
import data from "../language.json"

// import * as emailjs from "emailjs";


class About extends React.Component {
  render() {
    return (
      <div className="about-cont iletisim-child-cont">
        <div className="about-header">Proaktif</div>
        <div className="about-text">{this.props.text}</div>
      </div>
    );
  }
}

class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "email": "",
      "name": "",
      "topic": "",
      "message":""
    }
    this.sendEmail = this.sendEmail.bind(this)
  }
  changeState(comp, id, stateName) {
    var newValue = document.getElementById(id).value
    comp.setState({[stateName]:newValue})
  }
  sendEmail(comp) {
    if (this.state.name && this.state.email && this.state.topic && this.state.message) {
      function idSelector(id) {
        return document.getElementById(id)
      }
      idSelector("name").value = idSelector("email").value = idSelector("message").value = ""

      fetch("netkozanet/contactform/contactform.php?" + new URLSearchParams({
        "subject": this.state.topic,
        "message": this.state.message,
        "name": this.state.name,
        "email": this.state.email
        }),{
        method: "POST"
      })
    }
  }
  render() {
    var languageBox = data.tr.footer
    var options = languageBox.message_topic.map((text,index) => {
      return (
        <option className="topic" key={index}> {text} </option>
      )
    })
    return (
      <div className="iletisim-inputs-cont iletisim-child-cont">
        <div className="iletisim-inputs-header">Bizimle İletişime Geçin</div>
        <div className="iletisim-inputs-input-cont">
          <div className="email-sender-cont">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input onChange={()=>this.changeState(this,"name","name")} id="name" className="footer-input" placeholder="Adınız-Soyadınız"></input>
              <input onChange={() => this.changeState(this, "email", "email")} id="email" className="footer-input" placeholder="E-Mail Adresiniz"></input>
              <select onChange={() => this.changeState(this, "topic", "topic")} id="topic" className="topic_select">
                <option disabled defaultValue className="topic" > {languageBox["message-def"]} </option>
                {options}
              </select>
            </div>
            <textarea onChange={() => this.changeState(this, "message", "message")} id="message" className="footer-textarea" placeholder="Mesajınız"></textarea>
          </div>
          <div>
            <button onClick={this.sendEmail} className="footer-button">Gönder</button>
          </div>
        </div>
      </div>
    );
  }
}

class TextLink extends React.Component {
  render() {
    return <div className="text-link">{this.props.text}</div>;
  }
}

class InsideLinks extends React.Component {
  render() {
    let textList = data.tr.footer.links.map((object, index) => {
      if (object.to) {
        return (
          <Link key={index} to={object.to}>
            <TextLink text={object.text} />
          </Link>
        )
      }
      else if (object.externalTo) {
        return (
          <a target={"_blank"} rel="noopener noreferrer" key={index} href={object.externalTo}>
            <TextLink text={object.text} />
          </a>
        )
      }
      else {
        return (
          <TextLink text={object.text} key={index} />
        )
      }
    })
    return (
      <div className="InsideLink-cont iletisim-child-cont">
        <div className="inside-link-header">{data.tr.footer.linktitle}</div>
        {textList}
      </div>
    );
  }
}

class IconLink extends React.Component {
  render() {
    return (
      <div className="icon-link">
        <div className="icon">
          <FontAwesomeIcon
            className="f-color"
            size="2x"
            icon={this.props.icon}
          />
        </div>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    var listedFontAwesome = [
      { icon: faFacebook, to: "https://www.facebook.com/Proaktif-115947936916326" },
      { icon: faTwitter, to: "https://twitter.com/proaktiftr" },
      { icon: faLinkedin, to: "https://www.linkedin.com/company/proaktiftr" },
      { icon: faInstagram, to: "https://www.instagram.com/proaktiftr" },
      { icon: faYoutube, to: "https://www.youtube.com/channel/UCAEhH6H1trzuv30ZNXA7fXg" },
      { icon: faPinterest, to: "https://pinterest.com/proaktiftr" },
    ];
    var mappedList = listedFontAwesome.map((object, index) => {
      return (
        <a target="_blank" rel="noopener noreferrer" href={object.to} key={index}>
          <IconLink icon={object.icon} />
        </a>
      );
    });
    var languageBox = data.tr.footer
    return (
      <div className="iletişim-cont">
        <div className="iletişim">
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <About text={languageBox.proaktif_desc} />
            <InsideLinks />
          </div>
          <Inputs></Inputs>
        </div>
        <div className="bağlantılar">{mappedList}</div>
      </div>
    );
  }
}

export default Footer;
