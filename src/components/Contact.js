/* eslint-disable no-sequences */
import React from "react";
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
      { highlighted:"Proaktif Dijital Yönetim ve Eğitim Sistemleri Ltd. Şti.",text: "" },
      { text: "Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi" },
      { text: "Vatan Cad., No: 83 / B-34" },
      { text: "Yeniköy Merkez Mah., Başiskele" },
      { text: "41725 Kocaeli/Turkey" },
    ];
    function HighText({ object }) {
      if (object.highlighted) {
        return (
          <div style={{display:"flex"}}>
            <div style={{marginRight:"5px",color:"#fb4360"}}>
              {object.highlighted}
            </div>
            <div>
              {object.text}
            </div>
          </div>
        )
      }
      else {
        return (
          <div>
            <div>
              {object.text}
            </div>
          </div>
        )
      }
    }
    var mappedAdres = adresler.map((object) => (
      <div className="adres" key={object.text}>
        <HighText object={object} />
      </div>
    ));
    var contactProps = [
      { text: "Telefon Numarası:", value: "0850 333 00 61 - 0533 766 11 42" },
      { text: "E-Posta Adresi:", value: "info@proaktif.org" },
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
          {/*<iframe
            title="Map"
            frameBorder="0"
            width={this.state.width}
            height="300"
            style={{ border: "0px" }}
            src="https://www.google.com/maps/https://www.google.com/maps/embed/v1/place?q=Proaktif%20Dijital%20Y%C3%B6netim%20ve%20E%C4%9Fitim%20Sistemleri%20Ltd.%20%C5%9Eti.&key=AIzaSyDj7NqozXRR1OB7znxR85Qp6OvXpKyOmbw/v1/place?q=place_id:ChIJk6ZsfABEyxQRAiKa5sxMCyo&key=AIzaSyDG3pFZMfJt4GeBlUOCK6kMNfJdlKZdggk"
            allowFullScreen
          ></iframe>*/}
          <iframe title="Map" width={this.state.width} height="300" frameborder="0" style={{"border":"0px"}} src="https://www.google.com/maps/embed/v1/place?q=Proaktif%20Dijital%20Y%C3%B6netim%20ve%20E%C4%9Fitim%20Sistemleri%20Ltd.%20%C5%9Eti.&key=AIzaSyDj7NqozXRR1OB7znxR85Qp6OvXpKyOmbw" allowFullScreen></iframe>
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
        <Contact />
      </React.Fragment>
    );
  }
}

export default ContactComponent;
