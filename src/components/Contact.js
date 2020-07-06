/* eslint-disable no-sequences */
import React from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneSquareAlt } from "@fortawesome/free-solid-svg-icons";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  componentDidMount() {
    var component = this;
    window.onresize = function () {
      component.setState({
        width: window.innerWidth,
      });
    };
  }
  render() {
    var adresler = [
      { text: "Proaktif Dijital Yönetim ve Eğitim Sistemleri Ltd. Şti." },
      { text: "Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi" },
      { text: "Vatan Cad., No: 83 / B-34" },
      { text: "Yeniköy Merkez Mah., Başiskele" },
      { text: "41725 Kocaeli/Turkey" },
    ];
    var mappedAdres = adresler.map((object) => (
      <div className="adres" key={object.text}>
        {object.text}
      </div>
    ));
    var contactProps = [
      { text: "Telefon Numarası:", value: "0850 333 00 61 - 0533 766 11 42" },
      { text: "Mersis Numarası:", value: "0733088785300001" },
      { text: "Tepecik V.D.", value: "733 088 7853" },
    ];
    var mappedContactProps = contactProps.map((object, index) => (
      <div key={index} className="contact-prop">
        {object.text + " " + object.value}
      </div>
    ));
    return (
      <div className="contact-cont">
        <div>
          <iframe
            title="Map"
            frameBorder="0"
            width={this.state.width}
            height="300"
            style={{ border: "0px" }}
            src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJk6ZsfABEyxQRAiKa5sxMCyo&key=AIzaSyDG3pFZMfJt4GeBlUOCK6kMNfJdlKZdggk"
            allowFullScreen
          ></iframe>
        </div>
        <div className="adresler">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
          <div style={{ display: "flex", flexDirection: "column", margin: "0px 0px 0px 10px" }}>
            {mappedAdres}
          </div>
        </div>
        <div className="contact-props-cont">
          <FontAwesomeIcon icon={faPhoneSquareAlt} size="2x" />
          <div style={{marginLeft:"10px"}}>
            {mappedContactProps}
          </div>
        </div>
      </div>
    );
  }
}

class ContactComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <Contact />
        </div>
      </React.Fragment>
    );
  }
}

export default ContactComponent;
