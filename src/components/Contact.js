import React from 'react';
import { faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Contact() {
    return (
        <div>
            <div class="sample-header">
                <img src="assests/img/teknopark.jpg" style={{height:"100vh"}} alt=""/>
            </div>
            <div className="m-top71 sample-section-wrap" style={{ padding: 40 }}>
                <div className="sample-section">
                    <div className="card ">
                        <div className="row">
                            <div className="col-lg-6 col-xs-12 col-md-6 p-2 contact-border">
                                <iframe title="Map" frameborder="0" style={{ "border": "0px", minHeight: 500, minWidth: 310,marginTop:10 }} src="https://www.google.com/maps/embed/v1/place?q=Proaktif%20Dijital%20Y%C3%B6netim%20ve%20E%C4%9Fitim%20Sistemleri%20Ltd.%20%C5%9Eti.&key=AIzaSyDj7NqozXRR1OB7znxR85Qp6OvXpKyOmbw" allowFullScreen></iframe>
                            </div>
                            <div className=" col-lg-6 col-xs-12 col-md-6 p-2">
                                <div className="row text-left">
                                    <div style={{paddingLeft: 40,paddingRight: 40,paddingTop:15,paddingBottom:15}}><FontAwesomeIcon style={{ color: "white" }} icon={faPhone} />
                                        <p>Telefon Numarası: 0850 333 00 61 - 0533 766 11 42</p>
                                        <p>E-Posta Adresi: info@proaktif.org</p>
                                        <p>KEP Adresi: proaktifdijital@hs05.kep.tr</p>
                                        <p>Mersis Numarası: 0733088785300001</p>
                                        <p>Tepecik V.D. 733 088 7853</p>
                                    </div>
                                </div>
                                <hr style={{ width: "80%" }}></hr>
                                <div className="row text-left">
                                    <div style={{ paddingLeft: 40,paddingRight: 40,paddingTop:15,paddingBottom:15 }}>
                                        <FontAwesomeIcon style={{ color: "white" }} icon={faMapMarker} /> <p> Proaktif Dijital Yönetim ve Eğitim Sistemleri Ltd. Şti.</p>
                                        <p>Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi Vatan Cad.,</p>
                                        <p> No: 83 / B-34 Yeniköy Merkez Mah., Başiskelesi</p>
                                        <p>41725 Kocaeli/Turkey</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
