/* eslint-disable no-unused-vars */
import React from 'react';
import '../style.css';
import Sliders from "./Sliders"
import Iletisim from "./Iletisim"
import Header from "./Header"

import CountUp from "react-countup"

class Info1 extends React.Component {
  render() {
    return(
      <div className="center" id="info1">
        {this.props.slogan}
      </div>
    )
  }
}

class Prop extends React.Component {
  render() {
    return(
      <div className="info-prop" >
        <div className="prop-element">
          <div className="info-prop-header">
            {this.props.text1}
          </div>
          <div className="prop-explanation">
            {this.props.info1}
          </div>
        </div>
        <div className="prop-element">
        <div className="info-prop-header">
            {this.props.text2}
          </div>
          <div className="prop-explanation">
            {this.props.info2}
          </div>
        </div>
        <div className="prop-element">
        <div className="info-prop-header">
            {this.props.text3}
          </div>
          <div className="prop-explanation">
            {this.props.info3}
          </div>
        </div>
      </div>
    )
  }
}

class Info2 extends React.Component {
  render() {
    return(
      <div className="center" id="info2">
        <div className="info-header">
          {this.props.header}
        </div>
        <div className="info-props">
          <Prop text1="Sosyal Sorumluluk Projeleri" text2="Dış Ticaret Yönetim Sistemi" text3="DontBeCloser"
                info1="Var Gücümüzle 'Eğitim' diyoruz." info2="Yer ve Zamanından Bağımsız, İthalat, İhracat, Antrepo,Transit, Özet Beyan ve NCTS gibi tüm işlemleri Hızlıca gerçekleştirin"
                info3="DBC ile kendinizi güvene alın."
          ></Prop>
        </div>
      </div>
    )
  }
}

class Bulten extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className="bulten-cont center" id="bulten-cont">
          <div className="bulten-header">
            Bültene kayıt Olun
          </div>
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
    )
  }
}

class Statistic extends React.Component {
  render() {
    return(
      <div className="statistic">
        <div className="statistic-count">
          <CountUp start={0} end={this.props.count} duration={5} />
          +
        </div>
        <div className="statistic-text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

class Istatistikler extends React.Component {
  render() {
    var Statistics = [
      [
        {text:"Yıllık Deneyim",count:26},
        {text:"Beyanname",count:17000000}
      ],
      [
        {text:"Kullanıcı",count:7800},
        {text:"Hizmet",count:16000}
      ]
    ]
    var MappedComponents = Statistics.map((object) => 
      <div key={(object[0].text + ":" + object[1].text)} className="statistic-div">
        <Statistic key={object[0].text} text={object[0].text} count={object[0].count} />
        <Statistic key={object[1].text} text={object[1].text} count={object[1].count} />
      </div>
    )
    return(
      <div className="statistics">
        {MappedComponents}
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Header />
        <div className="body">
          <Sliders></Sliders>
          <Info1 slogan="Olası sorunlara, öncesinde çözümler üretiyoruz."></Info1>
          <Info2 header="Nitelikli yazılım, yönetim ve bilişim çözümlerimiz ile üretken karlı ve sürekli bir gelişim için proaktif vizyon"></Info2>
          <Istatistikler />
          <Iletisim></Iletisim>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
