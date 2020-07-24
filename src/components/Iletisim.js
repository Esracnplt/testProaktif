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
  render() {
    return (
      <div className="iletisim-inputs-cont iletisim-child-cont">
        <div className="iletisim-inputs-header">Bizimle İletişime Geçin</div>
        <div className="iletisim-inputs-input-cont">
          <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input className="footer-input" placeholder="Adınız-Soyadınız"></input>
              <input className="footer-input" placeholder="E-Mail Adresiniz"></input>
            </div>
            <textarea className="footer-textarea" placeholder="Mesajınız"></textarea>
          </div>
          <div>
            <button className="footer-button">Gönder</button>
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
      { icon: faFacebook, to: "https://www.facebook.com/" },
      { icon: faTwitter, to: "https://twitter.com" },
      { icon: faLinkedin, to: "https://www.linkedin.com/" },
      { icon: faInstagram, to: "https://www.instagram.com/" },
      { icon: faYoutube, to: "https://www.youtube.com/" },
      { icon: faPinterest, to: "https://pinterest.com/" },
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
