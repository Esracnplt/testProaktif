import React from 'react';
import '../style.css';
import Sliders from "./Sliders"
import Iletisim from "./Iletisim"
import Header from "./Header"

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

class Home extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Header></Header>
        <div className="body">
          <Sliders></Sliders>
          <Info1 slogan="Olası sorunlara, öncesinde çözümler üretiyoruz."></Info1>
          <Info2 header="Nitelikli yazılım, yönetim ve bilişim çözümlerimiz ile üretken karlı ve sürekli bir gelişim için proaktif vizyon"></Info2>
          
          <Iletisim></Iletisim>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
