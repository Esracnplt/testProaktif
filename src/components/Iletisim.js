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
        <div className="iletisim-inputs-header">Bizimle Hemen Temasa geçin</div>
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
    let textList = [
      { text: this.props.text1, key: 0 },
      { text: this.props.text2, key: 1 },
      { text: this.props.text3, key: 2 },
      { text: this.props.text4, key: 3 },
      { text: this.props.text5, key: 4 },
      { text: this.props.text6, key: 5 },
    ];
    return (
      <div className="InsideLink-cont iletisim-child-cont">
        <div className="inside-link-header">{this.props.title}</div>
        {textList.map((item) => {
          return <TextLink text={item.text} key={item.key}></TextLink>;
        })}
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
          <InsideLinks
            text1="Kurumsal"
            title="Yönlendirme"
            text2="Ürünlerimiz"
            text3="Projelerimiz"
            text4="İş Birliklerimiz"
            text5="Başarı Hikayemiz"
            text6="Kocaeli Üniversitesi Teknopark"
          ></InsideLinks>
          <Inputs></Inputs>
        </div>
        <div className="bağlantılar">{mappedList}</div>
      </div>
    );
  }
}

export default Iletisim;
