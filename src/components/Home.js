/* eslint-disable no-unused-vars */
import React from "react";
import "../style.css";
import Sliders from "./Sliders";
import Iletisim from "./Iletisim";
import Header from "./Header";

import CountUp from "react-countup";

import data from "../language.json"

class Info1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part1: data.tr.home.slogan[0],
      part2: data.tr.home.slogan[1],
      part3: data.tr.home.slogan[2],
    };
  }
  render() {
    return (
      <div className="center" id="info1">
        {this.state.part1}
        <div style={{ margin: 5, fontWeight: 700 }}>{this.state.part2}</div>
        {this.state.part3}
      </div>
    );
  }
}

class Prop extends React.Component {
  render() {
    return (
      <div className="info-prop">
        <div className="prop-element">
          <div className="info-prop-header">{this.props.text1}</div>
          <div className="prop-explanation">{this.props.info1}</div>
        </div>
        <div className="prop-element">
          <div className="info-prop-header">{this.props.text2}</div>
          <div className="prop-explanation">{this.props.info2}</div>
        </div>
        <div className="prop-element">
          <div className="info-prop-header">{this.props.text3}</div>
          <div className="prop-explanation">{this.props.info3}</div>
        </div>
      </div>
    );
  }
}

class Info2 extends React.Component {
  render() {
    return (
      <div className="center" id="info2">
        <div className="info-header">{this.props.header}</div>
        <div className="info-props">
          <Prop
            text1="Sosyal Sorumluluk Projeleri"
            text2="Dış Ticaret Yönetim Sistemi"
            text3="DontBeCloser (DahaYakınOlma) Projesi"
            info1="Var gücümüzle 'Eğitim' diyoruz."
            info2="Yer ve zamandan bağımsız olarak ithalat, ihracat, antrepo, transit, özet beyan ve NCTS gibi tüm işlemlerinizi hızlıca gerçekleştirin!"
            info3="DBC DontBeCloser (DahaYakınOlma) mobil uygulaması ve web yazılımı ile kendinizi güvene alın."
          ></Prop>
        </div>
      </div>
    );
  }
}

class Bulten extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="bulten-cont center" id="bulten-cont">
          <div className="bulten-header">Bültene kayıt Olun</div>
          <div>
            <input placeholder="E-Posta Adresiniz" className="main-input" />
            <button className="main-button">Kayıt Ol</button>
          </div>
          <div className="bulten-teknik-destek">
            Teknik Destek İçin:
            {" " + this.props.telno}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Statistic extends React.Component {
  render() {
    return (
      <div className="statistic">
        <div className="statistic-count">
          <CountUp start={0} end={this.props.count} duration={5} />+
        </div>
        <div className="statistic-text">{this.props.text}</div>
      </div>
    );
  }
}

class Istatistikler extends React.Component {
  render() {
    var Statistics = [
      [
        { text: "Yıllık Deneyim", count: 26 },
        { text: "Beyanname", count: 17000000 },
      ],
      [
        { text: "Kullanıcı", count: 7800 },
        { text: "Öğrenciye Hizmet", count: 16000 },
      ],
    ];
    var MappedComponents = Statistics.map((object, index) => (
      <div key={index} className="statistic-div">
        <Statistic text={object[0].text} count={object[0].count} />
        <Statistic text={object[1].text} count={object[1].count} />
      </div>
    ));
    return (
      <div className="statistics">
        <div className="stat-title">
          Rakamlarla Şirketimiz
          <div
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "10px",
              color: "white",
            }}
          >
            Birkaç İstatistik
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
        >
          {MappedComponents}
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="body">
          <Sliders></Sliders>
          <Info1></Info1>
          <Info2 header="Nitelikli yazılım, yönetim ve bilişim çözümlerimiz ile üretken kârlı ve sürekli bir gelişim için proaktif vizyon"></Info2>
          <Istatistikler />
          <Iletisim></Iletisim>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
