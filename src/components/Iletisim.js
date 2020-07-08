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
          <input className="footer-input" placeholder="İsminiz"></input>
          <input className="footer-input" placeholder="Konu"></input>
          <input className="footer-input" placeholder="Mesajınız"></input>
          <button className="footer-button">Gönder</button>
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
          <a key={index} href={object.to}>
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

class Iletisim extends React.Component {
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
        <a href={object.to} key={index}>
          <IconLink icon={object.icon} />
        </a>
      );
    });
    return (
      <div className="iletişim-cont">
        <div className="iletişim">
          <About
            text="
                       proaktif 2020
                    "
          ></About>
          {/*
                        
                        <InsideLinks text1="Hakkımızda" title="Kurumsal"
                                text2="Misyon-Vizyon" text3="Kariyer"
                                text4="Proaktif İş Kimliği" text5="Kurumsal Kimlik"
                    ></InsideLinks>
                        
                    */}
          <InsideLinks />
          <Inputs></Inputs>
        </div>
        <div className="bağlantılar">{mappedList}</div>
      </div>
    );
  }
}

export default Iletisim;
