/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { Link, withRouter } from "react-router-dom"
import data from "../language.json"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { isMobile } from 'react-device-detect'


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

const Inputs = () => {
  const defaultValue = {
    "email": "",
    "phoneNumber": "",
    "name": "",
    "topic": "",
    "message": ""
  };

  const [state, setState] = useState({ ...defaultValue });
  const [topicSetted, setTopicSetted] = useState(false);

  const changeState = (e) => {
    e.preventDefault();
    let { id, value } = e.target;
    setState(s => ({ ...s, [id]: value }));
  }

  var languageBox = data.tr.footer
  const OptionsTopic = () => {
    let hasTopicSetted = false;
    var options = languageBox.message_topic.map((text, index) => {
      if (!hasTopicSetted && !topicSetted) {
        hasTopicSetted = true;
        setTopicSetted(true);
        setState(s => ({ ...s, "topic": text }));
      }
      return (
        <option className="topic" key={index}> {text} </option>
      )
    })
    return options;
  }


  const sendEmail = (comp) => {
    if (state.name && state.email && state.phoneNumber && state.topic && state.message) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: "subject=" + state.topic + "&message=" + state.message + "&name=" + state.name + "&email=" + state.email + "&phonenumber=" + state.phoneNumber
      };
      fetch("/netkozanet/contactform/contactform.php", requestOptions)
        .then(r => r.json()).then(result => {
          if (result && result.sonuc) {
            setState({ ...defaultValue, topic: state.topic });
            Swal.fire({
              icon: "success",
              title: "Mesajınız Gönderildi. Teşekkür ederiz.",
              text: "(Bir Kopyası Mailinize Gönderilmiştir)"
            })
          } else
            throw "Sunucu Tarafında Gönderim Hatası Var";
        })
        .catch(e => {
          Swal.fire({
            icon: "error",
            title: "Mesajınız Gönderilemedi",
            html: "Lütfen tekrardan deneyiniz<br/> veya <br/><span style='font-weight:700'>info@proaktif.org</span> adresine talebinizi mail olarak gönderiniz"
          })
        })
    } else {
      Swal.fire({
        icon: "warning",
        text: "Lütfen boş alanları doldurunuz!"
      })
    }
  }

  return (
    <div className="iletisim-inputs-cont iletisim-child-cont">
      <div className="iletisim-inputs-header">Bizimle İletişime Geçin</div>
      <div className="iletisim-inputs-input-cont">
        <div className="email-sender-cont">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input onChange={changeState} value={state.name} id="name" className="footer-input" placeholder="Adınız-Soyadınız"></input>
            <input onChange={changeState} value={state.email} id="email" className="footer-input" placeholder="E-Mail Adresiniz"></input>
            <input onChange={changeState} value={state.phoneNumber} id="phoneNumber" className="footer-input" placeholder="Telefon Numaranız"></input>
            <select onChange={changeState} value={state.topic} id="topic" className="topic_select">
              <option disabled defaultValue className="topic" > {languageBox["message-def"]} </option>
              <OptionsTopic />
            </select>
          </div>
          <textarea onChange={changeState} value={state.message} id="message" className="footer-textarea" placeholder="Mesajınız"></textarea>
        </div>
        <div>
          <button onClick={sendEmail} className="footer-button">Gönder</button>
        </div>
      </div>
    </div>
  );
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
          <About text={languageBox.proaktif_desc} />
          <InsideLinks />
          <Inputs></Inputs>
          <div style={{ textAlign: "center", margin: "25px 10px 10px" }}>
            <a target="_blank" href={isMobile ? "https://wa.me/908503072610" : "https://web.whatsapp.com/send?phone=908503072610"} style={{ display: "inline-flex", background: "white", border: "2px solid rgb(39 39 39)", padding: "3px", borderRadius: "10px", alignItems: "center" }}>
              <span style={{ verticalAlign: "middle" }}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35"><path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg></span>
              <span style={{ verticalAlign: "middle", margin: "3px" }}>WhatsApp Destek</span>
            </a>
            <div style={{ fontWeight: "500", color: "white", margin: "10px" }}>veya</div>
            <div>
              <img style={{ width: "200px" }} src={require('./../img/wp_qr_code.jpg')} />
            </div>
          </div>
        </div>
        <div className="bağlantılar">{mappedList}</div>
      </div>
    );
  }
}

export default Footer;
