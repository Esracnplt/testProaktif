import React from 'react';

const VolunterEdu = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div>
                <div class="sample-header">
                    <img src="assests/img/teknopark.jpg" style={{height:"100vh"}}/>
                </div>

                <div className="m-top71 sample-section-wrap" style={{ padding: 40 }}>
                    <div className="sample-section">
                        <div className="row p-4">
                            <div className="text-left ml-4 col">
                                <h4 style={{ color: "#007bff" }}>Eğitimden İşe Sosyal Sorumluluk Projesi</h4>
                                <p className="m-2">Eğitimden İşe Sosyal Sorumluluk Projesi, dış ticaret ve lojistik sektörünün gelişimine destek sağlamak amacıyla, eğitim kurumları, öğrenciler ve dış ticaret firmalarını mesleki eğitim perspektifi ile aynı çatı altında toplamayı amaçlanmaktadır.</p>
                                <p className="m-2">Proje, sunduğu imkânlar ve gerçekleştirdiği çalışmalarla mesleki eğitim alanındaki ihtiyaçların karşılanması için bütüncül bir model sunar. Katma değer ve nitelikli iş gücü hedefli bu model diğer mesleki teknik eğitim alanlarına da adapte edilebilir.</p>
                                <p className="m-2">Projenin hedef kitlesini eğitim kurumları, öğrenciler ve sektör temsilcileri oluşturmaktadır. Eğitim kurumlarıyla işbirliği yapılarak mesleki eğitimin kalitesinin artırılması nosyonu ile kurumlara teknolojik altyapı, güncel bulut teknolojisi ile üretilmiş web tabanlı çevrimiçi eğitim materyali ve yazılım desteği sağlanmaktadır.</p>
                                <p className="m-2">Bu kapsamda öğrencilerin mesleki eğitim süreçleri desteklenerek, alanlarında daha donanımlı olmaları ve hızla istihdamları önemli bir hedeftir. Sektör temsilcileri ile işbirliği yapılarak başarılı ve ihtiyaç sahibi öğrencilere burs verilmesine ve öğrencilerin staj yapmalarına olanak sunulmaktadır.</p>
                            </div>
                            <div className="col d-block align-items-center justify-content-center">

                                <img src={'/assests/img/egitimdenise.jpg'} className="p-2 img-fluid" height="250px" max-width="450px" />
                            </div>
                        </div> <hr></hr>
                        <div className="text-left ml-4 mt-4 row">
                            <div className="col">
                                <img src={'/assests/img/ucurtma.jpg'} className="p-2 img-fluid" className="p-2 mt-4 img-fluid" height="250px" max-width="450px" />
                            </div>
                            <div className="col">
                                <h4 style={{ color: "#007bff" }}> Uçurtma Sosyal Sorumluluk Projesi</h4>
                                <p className="m-2">Uçurtma Sosyal Sorumluluk Projesi, Eğitim Geleceğimiz sosyal sorumluluk genel faaliyetleri kapsamında, hayallerini gerçekleştirebilmeleri ve uçurtmalarla kendilerini ifade etmeleri için çocuklara olanaklar sunmayı amaçlamaktadır.</p>
                                <p className="m-2">Projenin başkahramanı ve fikir sahibi Zahit Mungan, Mardin’de başlayan hayat hikâyesi, ustalığı ve gökyüzünü kucaklayan tasarımları ile etkinliklere yön vermektedir.</p>
                                <p className="m-2">Hazırlık aşamasından uçurma deneyimine kadar her adımında fiili olarak projede yer alan çocuklar, aslında gelecekte ihtiyaç duyacakları yaratıcı düşünme, problem çözme, takım çalışması gibi birçok beceriyi uygulamalı olarak edinmektedir.</p>
                                <p className="m-2">Hazırladıkları uçurtmaları gökyüzü ile buluşturan öğrencilerin, kendi tasarımı uçurtmaları çevreleriyle değişik ortamlarda paylaşmanın gurur, heyecan ve mutluluğunu yaşaması hedeflenmektedir</p>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="text-left ml-4 mt-4 row">
                            <div className="col">
                                <h4 style={{ color: "#007bff" }}>Okula Destek Sosyal Sorumluluk Projesi</h4>
                                <p className="m-2">DBC projesi kapsamında geliştirilmekte olan yöntemin bir aktüatör olarak yer alacağı bu ürüne yönelik proje ile portatif giyilebilen bir aparat tasarımı ve gerçekleştirilmesi amaçlanmaktadır. Aparat, yüz ya da kafa etrafında bir basınçlı hava/ışık/sinyal duvarı oluşturarak koruma sağlayacak şekilde tasarlanmaktadır</p>
                                <p className="m-2">Klasik maske benzeri koruma çözümlerine önemli bir alternatif olarak salgın veya enfekte riski yüksek bazı özellikli ortamlarda önleyici tedbir ürünü olarak ticarileştirilmesi hedeflenmektedir</p>
                                <p className="m-2">Proje dört adımda gerçekleştirilmektedir</p>
                                <p className="m-2">Çevrimiçi Destek Platformu, eğitim ihtiyaçlarının karşılanması için ilköğretim okulları ile destek sağlayıcıları bir araya getirmektedir. Bu amaçla okullar, teknolojik donanım (bilgisayar, akıllı tahta vb.), fiziki iyileştirme (sınıfların boyanması, okul yenileme vb.), öğrenciler için kıyafet, seminerler ve eğitim malzemeleri (kütüphane kitapları, deney malzemeleri vb.) gibi değişik talepler açabilmektedir.</p>
                                <p className="m-2">Platformda açılan talepler, platforma yer alan kişi ve kurumların destek oranı doğrultusunda karşılanmaktadır.</p>
                            </div>
                            <div className="col">
                                <img src={'/assests/img/okuladestek.jpg'} className="p-2 img-fluid" height="150px" width="350px" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default VolunterEdu;
