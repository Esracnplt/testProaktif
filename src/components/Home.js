/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import "../style.css";
import Sliders from "./Sliders";
import Header from "./Header";
import CreateDemo from './CreateDemo';
import ProaktifTab from '../utils/ProaktifTab';
import CountUp from "react-countup";

import data from "../language.json"
import { faTumblr } from "@fortawesome/free-brands-svg-icons";

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
        <div style={{ textAlign: "center" }}>
          {this.state.part1}
          <span style={{ margin: 5, fontWeight: 700 }}>{this.state.part2}</span>
          {this.state.part3}
        </div>
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
              fontSize: "16px",
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

function Button({ text, ClickFunction }) {
  return (
    <button onClick={ClickFunction} className="homebutton">
      {text}
    </button>
  )
}

const Buttons = () => {
  const ReactSwal = withReactContent(Swal)
  const ref = useRef();

  const [hasLoadedSchools, setHasLoadedSchools] = useState(false);
  const [egitimDestekleriTabs, setEgitimDestekleriTabs] = useState({
    liseler: {
      id: "liseler",
      buttonText: "Liseler",
      content: "Liseler listesi",
    },
    yuksekOkullar: {
      id: "yuksekOkullar",
      buttonText: "Yüksek Okullar",
      content: "Yüksek Okullar listesi",
    },
    digerKurumlar: {
      id: "digerKurumlar",
      buttonText: "Diğer Kurumlar",
      content: `<div>1- <a href="http://tdv.proaktif.org/" target="_blank">Türk Dışticaret Vakfı</a><br></div>`,
    }
  });

  useEffect(() => {
    if (hasLoadedSchools) {
      Swal.close();
      ReactSwal.fire({
        title: "Eğitim Destekleri",
        confirmButtonText: "Tamam",
        showCloseButton: true,
        html: <ProaktifTab tabs={egitimDestekleriTabs} />
      });
    }
  }, [egitimDestekleriTabs, hasLoadedSchools]);

  const demoOlustur = (currentValues) => {
    ReactSwal.fire({
      title: <p style={{ fontSize: "20px", fontWeight: "700" }}>Demo Sunucu İçin Bilgilerinizi Giriniz..</p>,
      //footer: 'Copyright 2018',
      allowOutsideClick: false,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: "Vazgeç",
      confirmButtonText: "Kaydol",
      html: <CreateDemo currentValues={currentValues} ref={ref} />,
      // onOpen: () => {
      //   //ReactSwal.clickConfirm()
      // },
      // onDestroy: () => {
      // },
    }).then(async (result) => {
      if (result.value) {
        const { saveResult, currentValues } = await ref.current.saveDemo();
        if (!saveResult)
          demoOlustur(currentValues);
      }
      if (!result.isConfirmed && ref.current && ref.current.salindi && ref.current.salindi !== "") {
        ref.current.deleteDemo(ref.current.createdDomainInfo);
      }
    });
  }

  const btnDemoCreateClick = (e) => {
    demoOlustur();
  }

  const btnEgitimDestekleriClick = (e) => {
    ReactSwal.fire({
      title: "Eğitim Destekleri",
      confirmButtonText: "Tamam",
      showCloseButton: true,
      icon: (!hasLoadedSchools) ? "info" : "",
      html: (!hasLoadedSchools) ? <div>Bilgiler getiriliyor...<br />Lütfen bekleyiniz.</div> : <ProaktifTab tabs={egitimDestekleriTabs} />,
      onOpen: () => {
        if (!hasLoadedSchools) {
          fetch("/index/okullar/")
            .then(response => response.json())
            .then((data) => {
              setEgitimDestekleriTabs(tabs =>
                ({
                  ...tabs,
                  liseler: {
                    ...tabs.liseler,
                    content: data.okulLise
                  },
                  yuksekOkullar: {
                    ...tabs.yuksekOkullar,
                    content: data.okulYuksekokul
                  }
                }));
              setHasLoadedSchools(true);
            })
            .catch((e) => {
              Swal.close();
              ReactSwal.fire({
                title: "Eğitim Destekleri",
                confirmButtonText: "Tamam",
                showCloseButton: true,
                html: `<div style="color:red;">Bilgiler getirilirken hata oluştu!<br/>${e}</div>`,
                icon: 'error',
              });
            })
        }
      },
    })
  }

  /**
   * START: Sertifika Kontrol Swal Kondları
   */
  const [sertifikaKontrolUyariMesaji, setSertifikaKontrolUyariMesaji] = useState();

  const inputSertifikaNo = useRef(null);

  useEffect(() => {
    if (sertifikaKontrolUyariMesaji) {
      Swal.close();
      showSertifikaKontrolSwall(sertifikaKontrolUyariMesaji);

    }
    return () => {
      setSertifikaKontrolUyariMesaji("");
    };
  }, [sertifikaKontrolUyariMesaji]);

  const sertifikaKontrolSwalPreConfirm = (isConfirmed) => {
    if (inputSertifikaNo.current.value.length < 1 || inputSertifikaNo.current.value === "") {
      setSertifikaKontrolUyariMesaji("Lütfen sertifika numaranızı kontrol ediniz...");
      return false;
    }
  }

  const showSertifikaKontrolSwall = (sertifikaKontrolUyariMesaji) => {
    ReactSwal.fire({
      title: <div><strong>Sertifika Sorgulama</strong><br /><label id="mesaj" style={{ fontSize: "11px !important", color: "red" }}>{sertifikaKontrolUyariMesaji}</label></div>,
      html: <div><input type="text" id="sertifikano" ref={inputSertifikaNo} style={{ "borderRadius": "5px", "fontSize": "16px", "backgroundColor": "#f0f8ff", "padding": "5px", "height": "20px", "width": "100%" }} placeholder="TC Kimlik veya Sertifika No.."></input></div>,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: "Sertifika Ara",
      allowOutsideClick: false,
      footer: "Sorgulamak istediğiniz Sertifika veya TC Kimlik Numarasını Giriniz..",
      preConfirm: sertifikaKontrolSwalPreConfirm,
    }).then((result) => {
      if (result.value) {
        const sertifikaNo = inputSertifikaNo.current.value;
        ReactSwal.fire({
          title: <div><strong>Sertifika Sorgulama</strong><br /><label id="mesaj" style={{ fontSize: "11px !important", color: "red" }}>{sertifikaKontrolUyariMesaji}</label></div>,
          showCloseButton: true,
          icon: "info",
          html: <div>Bilgiler getiriliyor...<br />Lütfen bekleyiniz.</div>,
          onOpen: () => {
            fetch("/sertifika/sertifikadurumkontrol?BelgeNo=" + sertifikaNo)
              .then(response => response.json())
              .then(data => {
                let aciklama = "";
                if (data.uyari === "0") {
                  if (data.egitmen)
                    aciklama = '<div style="text-align:left"><b>Sertifika Sahibi:</b> ' + data.adsoyad + '<br><b>Eğitmen:</b> ' + data.egitmen + '<br><b>Sertifika Tarihi:</b> ' + data.zaman + '</div>';
                  else
                    aciklama = '<div style="text-align:left"><b>Sertifika Sahibi:</b> ' + data.adsoyad + '<br><b>Sertifika Tarihi:</b> ' + data.zaman + '</div>';
                  ReactSwal.fire({
                    title: "Sertifika Doğrulandı",
                    html: <div dangerouslySetInnerHTML={{ __html: aciklama }}></div>,
                    type: "success",
                    showCloseButton: true,
                    confirmButtonText: "Tamam",
                    footer: "Yukarıda bilgileri yazılı kullanıcı Sertifikalı kullanıcımızdır.",
                  });
                }
                else
                  Swal.fire({
                    title: "Sertifika Bulunamadı",
                    html: 'Girdiğiniz ' + sertifikaNo + ' TC Kimlik / Sertifika numaralı Sertifika sistemimizde bulunamadı..',
                    type: "error",
                    showCloseButton: true,
                    confirmButtonText: "Tamam",
                    footer: sertifikaNo + " TC Kimlik / Sertifika Numaralı Sertifika yok ya da bilgiler yanlış girilmiş...",
                  });
              })
              .catch(res => {
                console.log("Hata" + res);
                Swal.fire("Sertifika Ara", "Bir hata oluştu. Lütfen Online Destekten yazınız...", "error");
              });
          },
        })
      }
    })
  }

  const btnSertifikaKontrolClick = () => {
    showSertifikaKontrolSwall(sertifikaKontrolUyariMesaji);
  }
  /**
   * END: Sertifika Kontrol Swal Kodları
   */

  /**
   * START: Sunucu Bul Swal Kodları
   */
  const [sunucuBulUyariMesaji, setSunucuBulUyariMesaji] = useState()
  const inputSunucuBulTCKNO = useRef(null);

  useEffect(() => {
    if (sunucuBulUyariMesaji) {
      const sunucuBulTCKNO = inputSunucuBulTCKNO.current.value;
      Swal.close();
      showSunucuBulSwall(sunucuBulTCKNO, sunucuBulUyariMesaji);
    }
    return () => {
      setSunucuBulUyariMesaji("");
    };
  }, [sunucuBulUyariMesaji]);

  const sunucuBulSwalPreConfirm = (isConfirmed) => {
    if (inputSunucuBulTCKNO.current.value.length !== 11) {
      setSunucuBulUyariMesaji("Lütfen Tc Kimlik numaranızı kontrol ediniz...");
      return false;
    }
  }
  const showSunucuBulSwall = (sunucuBulTCKNO, sunucuBulUyariMesaji) => {
    ReactSwal.fire({
      title: <div><strong>Sunucu Bul</strong><br /><label id="mesaj" style={{ "fontSize": "11px !important", "color": "red" }}>{sunucuBulUyariMesaji}</label></div>,
      html: <div><input id="tckimlikno" ref={inputSunucuBulTCKNO} style={{ "borderRadius": "5px", "fontSize": "20px", "backgroundColor": "#f0f8ff" }} placeholder="TC Kimlik No.." /></div>,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: "Sunucu Ara",
      allowOutsideClick: false,
      footer: "Şirket sunucu adresinizi bulmak için Tc Kimlik Numaranızı Giriniz..",
      preConfirm: sunucuBulSwalPreConfirm,
      onOpen: () => {
        inputSunucuBulTCKNO.current.value = sunucuBulTCKNO;
      },
    }).then((result) => {
      if (result.value) {
        const tc = inputSunucuBulTCKNO.current.value;
        ReactSwal.fire({
          title: <div><strong>Sunucu Bul</strong><br /><label id="mesaj" style={{ "fontSize": "11px !important", "color": "red" }}>{sunucuBulUyariMesaji}</label></div>, confirmButtonText: "Tamam",
          showCloseButton: true,
          icon: "info",
          html: <div>Bilgiler getiriliyor...<br />Lütfen bekleyiniz.</div>,
          onOpen: () => {
            fetch("/index/sunucubul/" + tc)
              .then(response => response.json())
              .then(data => {
                if (data.sonuc === "var") {
                  ReactSwal.fire({
                    title: "Şirketinizin Sunucu Adresi/Adresleri",
                    html: <div style={{ "textAlign": "left" }} title="Açmak için tıklayınız.." dangerouslySetInnerHTML={{ __html: data.sunucu }}></div>,
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonText: "Tamam",
                    footer: "Şirketinizin adresini açmak için ismine tıklayınız..",
                  });
                }
                else
                  ReactSwal.fire({
                    title: "Sunucu Bulunamadı",
                    html: <div>'Girdiğiniz {tc} TC kimlik numarasının kayıtlı olduğu herhangi bir sunucu bulunamadı..</div>,
                    icon: "error",
                    showCloseButton: true,
                    confirmButtonText: "Tamam",
                    footer: "TC kimlik numaranızın doğruluğundan emin olunuz...",
                  }).then((result) => {
                    if (result.value) {
                      showSunucuBulSwall(tc, sunucuBulUyariMesaji);
                    }
                  });
              })
              .catch(res => {
                console.log("Hata" + res);
                Swal.fire("Sunucu Bul", "Bir hata oluştu. Lütfen Online Destekten yazınız...", "error");
              });
          },
        })
      }
    })
  }

  const btnSunucuBulClick = () => {
    showSunucuBulSwall("", sunucuBulUyariMesaji);
  }
  /**
   * END: Sunucu Bul Swal Kodları
   */

  const GumrukYonlendirmesi = () => {
    window.open("https://gumruksistemdurumu.org/", "_blank")
  }

  const [state, setState] = useState({
    texts: [
      {
        text: "Gümrük Sistemi Durumu",
        ClickFunction: GumrukYonlendirmesi
      },
      {
        text: "Eğitim Destekleri",
        ClickFunction: btnEgitimDestekleriClick,
      },
      {
        text: "Demo Oluştur",
        ClickFunction: btnDemoCreateClick
      },
      {
        text: "Sertifika Kontrol",
        ClickFunction: btnSertifikaKontrolClick
      },
      {
        text: "Sunucu Arama",
        ClickFunction: btnSunucuBulClick
      }
    ]
  });

  var mappedButtons = state.texts.map((button, index) => {
    return (
      <Button ClickFunction={button.ClickFunction} key={index} text={button.text} />
    )
  })
  return (
    <div className="homebuttons">
      {mappedButtons}
    </div>
  )
}

class Home extends React.Component {

  componentDidMount() {
    const Tawk_LoadStart = new Date();
    const script = document.createElement("script");
    script.id = 'tawkId';
    script.async = true;
    script.src = "https://embed.tawk.to/5f4aba311e7ade5df44518a9/default";
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.onload = () => this.startTawk();
    //For head
    document.head.appendChild(script);
  }

  componentWillUnmount() {
    document.getElementById("tawkId").remove();
  }

  startTawk() {
    var Tawk_API = Tawk_API || {};
    Tawk_API.visitor = {
      name: window.location.hostname
    };
  }

  render() {
    return (
      <React.Fragment>
        <Sliders></Sliders>
        <Buttons />
        <Info1></Info1>
        <Info2 header="Nitelikli yazılım, yönetim ve bilişim çözümlerimiz ile üretken, kârlı ve sürekli bir gelişim için proaktif vizyon."></Info2>
        <Istatistikler />
      </React.Fragment>
    );
  }
}

export default Home;
