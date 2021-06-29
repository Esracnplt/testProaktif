import React, { useState, useEffect, useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Modal from 'react-responsive-modal';
import CreateDemo from './CreateDemo';
import 'react-responsive-modal/styles.css';
import CertificateFrom from './CertificateFrom';
import SupportEduFrom from './SupportEduFrom';
import { useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { navClass } from '../utils/atomUtils';
import CountUp from "react-countup";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProaktifTab from './ProAktifTab';
import translate from '../i18nProvider/translate';

export default function Index() {
    const location = useLocation();
    const path = location.pathname.split("/");
    const ReactSwal = withReactContent(Swal);
    const [navClassName, setNavClassName] = useRecoilState(navClass);
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

    /**
     * START: Demo oluştur Swal Kondları
     */
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
          willOpen: () => {
            if (!hasLoadedSchools) {
              fetch("https://pro.proaktif.org/index/okullar")
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
     * End: Sertifika Kontrol Swal Kondları
     */

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
            html: <div><input type="text" id="sertifikano" ref={inputSertifikaNo} className="react-tel-input form-control" placeholder="TC Kimlik veya Sertifika No.."></input></div>,
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
                    willOpen: () => {
                        fetch("https://pro.proaktif.org/sertifika/sertifikadurumkontrol?BelgeNo=" + sertifikaNo)
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
   * Start: Sunucu Bul Swal Kodları
   */
    const [sunucuBulUyariMesaji, setSunucuBulUyariMesaji] = useState()
    const inputSunucuBulTCKNO = useRef(null);



    useEffect(() => {
        if (sunucuBulUyariMesaji) {
            debugger;
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
            html: <div><input id="tckimlikno" ref={inputSunucuBulTCKNO} className="react-tel-input form-control" placeholder="TC Kimlik No.." /></div>,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: "Sunucu Ara",
            allowOutsideClick: false,
            footer: "Şirket sunucu adresinizi bulmak için Tc Kimlik Numaranızı Giriniz..",
            preConfirm: sunucuBulSwalPreConfirm,
            didOpen: () => {
                console.log(inputSunucuBulTCKNO.current,"inputSunucuBulTCKNO.current");
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
                    willOpen: () => {
                        fetch("https://pro.proaktif.org/index/sunucubul/" + tc)
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
                                        console.log(result,"result");
                                        if (result.value) {  debugger;
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


    useEffect(() => {
        if (path[1].length === 0) {
            setNavClassName("mainbar mainbar-color");
        }
    }, [navClassName]);

    const slideImages = [
        'assests/img/slider1.jpeg',
        'assests/img/slider2.jpg',
        'assests/img/slider3.jpg',
        'assests/img/slider4.jpg',
    ];

    return (
        <>
            <div class="sample-header">
                <img src="assests/img/teknopark.jpg" style={{height:"100vh"}} />
            </div>
            <div>
                <Slide easing="ease">
                    <div className="each-slide">
                        <div className="img-fluid" style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                            <span style={{ backgroundColor: "rgb(0, 173, 239,0.3)", color: "white", fontWeight: "bold", fontSize: 25, borderRadius: 10 }}><a style={{color:"white"}} href="/VolunterEdu">Proaktif Eğitim Destekleri</a></span>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div className="img-fluid" style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                            <span style={{ backgroundColor: "rgb(0, 173, 239,0.3)", color: "white", fontWeight: "bold", fontSize: 25, borderRadius: 10 }}><a style={{color:"white"}} href="/Products">Proaktif Dış Ticaret yönetim </a></span>
                        </div>
                    </div>
                    <div className="img-fluid" className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                            <span style={{ backgroundColor: "rgb(0, 173, 239,0.3)", color: "white", fontWeight: "bold", fontSize: 25, borderRadius: 10 }}><a style={{color:"white"}} href="/Projects">Proaktif Arge Projeleri</a></span>
                        </div>
                    </div>
                    <div className="img-fluid" className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[3]})` }}>
                            <span style={{ backgroundColor: "rgb(0, 173, 239,0.3)", color: "white", fontWeight: "bold", fontSize: 25, borderRadius: 10 }}><a style={{color:"white"}} href="VolunterEdu">Proaktif Sosyal Sorumluluk Projeleri</a></span>
                        </div>
                    </div>
                </Slide>
            </div>
            <div class="sample-section-wrap">
                <div class="sample-section">
                    <div className="homeButtons">
                        <button className="homeButton" ><a href="https://gumruksistemdurumu.org/">{translate('customssystems')}</a></button>
                        <button className="homeButton" onClick={() => btnEgitimDestekleriClick()}>{translate('supportEdu')}</button>
                        <button className="homeButton" onClick={() => btnDemoCreateClick()} >{translate('createDemo')}</button>
                        <button className="homeButton" onClick={() => btnSertifikaKontrolClick()}>{translate('certificateCheck')}</button>
                        <button className="homeButton " onClick={() => btnSunucuBulClick()}>{translate('serverSearch')}</button>
                    </div>
                    <div className="info1 d-flex align-items-center justify-content-center">
                        <p style={{ fontWeight: "bold" }}>Olası <strong>sorunlara</strong> öncesinde çözümler üretiyoruz!</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center text-center w-100 row mb-4" style={{ padding: 50 }}>
                        <h5 style={{ margin: 60, fontWeight: "bold", color: "black" }}>Nitelikli yazılım, yönetim ve bilişim çözümlerimiz ile üretken, kârlı ve sürekli bir gelişim için proaktif vizyon.</h5>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-4 mt-2"><h5 style={{ color: "#00ADEF" }}>Sosyal Sorumluluk Projeleri
                   </h5>Var gücümüzle 'Eğitim' diyoruz.</div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-4 mt-2">
                            <h5 style={{ color: "#00ADEF" }}>Dış Ticaret Yönetim Sistemi</h5>
                   Yer ve zamandan bağımsız olarak ithalat, ihracat, antrepo, transit, özet beyan ve NCTS gibi tüm işlemlerinizi hızlıca gerçekleştirin!
                </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-4 mt-2"> <h5 style={{ color: "#00ADEF" }}>DontBeCloser (DahaYakınOlma) Projesi</h5>
                DBC DontBeCloser (DahaYakınOlma) mobil uygulaması ve web yazılımı ile kendinizi güvene alın.
                </div>
                    </div>
                    <div className="statistics">
                        <div className="d-block jusify-content-center align-items-start" style={{ zIndex: 1, color: "white" }}>
                            <p style={{ color: "#00ADEF", fontSize: 18, fontWeight: "bold" }}>Rakamlarla Şirketimiz</p>
                            <p style={{ fontSize: 18, fontWeight: "bold" }}>Birkaç İstatistik</p></div>
                        <div className="d-flex jusify-content-center align-items-center row w-100" style={{ zIndex: 1, color: "white" }}>
                            <div className="col-lg-3 col-xs-3"><CountUp start={0} end={17000000} duration={5} />+
                            <div className="d-flex align-items-center justify-content-center">
                                    Yıllık Deneyim
                            </div>
                            </div>
                            <div className="col-lg-3 col-xs-3"><CountUp start={0} end={26} duration={5} />+
                            <div className="d-flex align-items-center justify-content-center">
                                    Beyanname
                            </div></div>
                            <div className="col-lg-3 col-xs-3">
                                <CountUp start={0} end={7800} duration={5} />+
                            <div className="d-flex align-items-center justify-content-center">
                                    Kullanıcı
                            </div></div>
                            <div className="col-lg-3 col-xs-3"><CountUp start={0} end={16000} duration={5} />+
                            <div className="d-flex align-items-center justify-content-center">
                                    Öğrenciye Hizmet
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
