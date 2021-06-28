import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { navClass } from '../utils/atomUtils';

export default function Corporate() {
    const location = useLocation();
    const path = location.pathname.split("/");
    const [navClassName, setNavClassName] = useRecoilState(navClass);


    useEffect(() => {
        if (path[1].length !== 0) {
            setNavClassName("navMain");
        }
    }, [navClassName]);

    return (
        <div>
            <div class="sample-header">
                <img src="assests/img/teknopark.jpg" />
            </div>

            <div className={navClassName === "navMain" ? "m-top71 sample-section-wrap" : "sample-section-wrap"} style={{ padding: 40 }}>
                <div className="sample-section">
                    <div className="text-left ml-4">
                        <h4 style={{ color: "#007bff" }}>Hakkımızda</h4>
                        <p className="m-2">Proaktif Dijital Yönetim ve Eğitim Sistemleri Ltd. Şti., üst düzey kurucuları ile araştırma ve geliştirme ekibinin 28 yılı aşkın yazılım ve sistem projeleri tecrübesi ve global bir büyüme stratejisi doğrultusunda, 2020 yılından itibaren Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi’nde konumlanarak faaliyetlerini sürdürmektedir.</p>
                        <p className="m-2">Kullanılan teknoloji ve özellikleri ile ülkemizde geliştirilen diğer yazılımların ötesinde bir yapıda ve 7/24 çevrimiçi destekle dış ticaret sektöründe kalite ve verimlilik anlayışıyla gümrük müşavirlik firmalarına hizmet sunulması hedeflenmektedir. Bu kapsamda Ar-Ge süreçleri öz kaynaklar ile desteklenen nitelikli ürün geliştirme faaliyetleri planlanmaktadır. Tüm Ar-Ge projeleri için global yatırımcıların yanı sıra özellikle TÜBİTAK, KOSGEB, MARKA Kalkınma Ajansı ve Horizon Europe 2021-2027 fonlarından hibe destek temini için üniversite ilgili bölümleriyle de akademik işbirliği yaparak fon temin edilmesi öncelikli hedeflerimiz arasındadır.</p>
                        <p className="m-2">Teknopark çatısı altında bilişim, büyük veri, data analitik, web/sunucu yazılım, mobil yazılım ve alanlarında nitelikli eleman (lisans dereceli) ve altyapı yatırımları yapılmaktadır. Firma çalışanlarının özellikle bilişim/ağ teknolojileri, veri merkezleri, kablosuz iletişim, web/sunucu yazılım, mobil uygulama ve sinyal işleme alanlarında tecrübe ve birikimi bulunmaktadır. Ayrıca lisansüstü dereceli personel istihdamı öngörülmekte olup gerçekleştirilecek Ar-Ge faaliyetleri akademik çalışmalar ile sürekli desteklenecektir. Tüm proje faaliyetleri, standart mühendislik ve proje yönetim süreçlerine uygun olarak gerçekleştirilmektedir. Ticarileştirmeye yönelik profesyonel uygulama testleri ve akademik yeterlikler için test hizmetleri ile bilimsel danışmanlık hizmeti alımı ve işbirlikleri yürütülmektedir. TÜBİTAK TEYDEB (KOBİ Ar-Ge Başlangıç Destek Programı) fonundan faydalanmak üzere proje başvurusunun yanı sıra sonraki dönemlerde ikinci ana faaliyet konusu olarak firma vizyonu içerisinde bulunan Sağlıkta Dijital Teknolojiler (E-Sağlık Uygulamaları, BİT Tabanlı Yenilikçi Tıbbi Cihazlar ve Sağlıkta Büyük Veri ve Veri Analitiği) alanında özgün sinyal işleme ve gömülü sistem/yazılım projeleri (web, mobil, sunucu, büyük veri, veri analitiği çözümleri) planlanmaktadır.</p>
                    </div>
                    <img width="1000px" className="img-fluid" style={{ padding: 40 }} src={"assests/img/office.jpg"} />
                    <div className="text-left ml-4 ">
                        <h4 style={{ color: "#007bff" }}>Kariyer</h4>
                        <p className="m-2">Proaktif ile kariyer yapmak ve yeni ufuklara yelken açmak için bize özgeçmişlerinizi iletebilirsiniz.</p>
                        <p className="m-2">Başvurunuz bize ulaştığında aday havuzumuza alınır ve aranan özellikler ile niteliklerinizin örtüşmesi durumunda sizinle iletişime geçilir. Başvurular, sadece Proaktif Dijital Yönetim ve Eğitim Sistemleri Ltd. Şti. İnsan Kaynakları tarafından incelenecek olup gizlilik esası çerçevesinde değerlendirilecektir.</p>
                        <p className="m-2">Başvuru için: info@proaktif.org</p>
                    </div>
                    <div className="text-left ml-4 p-3">
                        <h4 style={{ color: "#007bff" }}>İş Kültürü ve Değerlerimiz</h4>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Çalışanlarımız</h5>Çalışanlarımız ve yenilikçi vizyonları şirketimizin sahip olduğu en değerli yatırımdır. Gelişime açık profesyonelleri bünyemize dahil eder kalite ve sürekli gelişimi destekleyen en uygun olanakları sunmaya özen gösteririz.</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Ekip Ruhu</h5>Proaktif ailesi olarak; ilkeli, kaliteli, katma değeri yüksek çözümler üretmek ve hizmet sunmak için gerekli tüm çalışmalar ekip ruhuyla yürütülmektedir.</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Değer Katmak</h5>Sektörel firmalar/kullanıcılar, müşteriler, iş birliği yapılan ortaklar, çözüm ortakları, firma çalışanlarımız ve aynı zamanda bünyesinde farklı iş ya da proje süreçlerinde birlikte olduğumuz topluluklar için değer yaratmak istiyoruz. Proaktif ailesinin yöneticileri ve tüm çalışanları sorumluluk bilinci ile tutkulu, heyecanlı ve yenilikçi çalışmalarıyla daima bu hedefe yürüyecektir.</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Kurumsal Kimlik Kılavuzu</h5>
                        Kurumsal renklerimizin (logoda bulunan temel renk bileşenleri) kodları:</p>
                        <div className="d-flex align-items-center justify-content-center row ">
                            <div className="col-lg-3 col-xs-12 d-flex align-items-center justify-content-center">
                                <img height='150px' width='120px' src={'/assests/img/logo.png'} />
                            </div>
                            <div className="col-lg-8 col-xs-12">
                                <table style={{border:"none"}} >
                                    <tbody>
                                        <tr>
                                            <th  style={{width:60}}><div style={{backgroundColor:"rgb(213, 241, 252)",height:30,width:40,borderRadius:5}}></div></th>
                                            <td><strong>HEX:</strong> #d5f1fc</td>
                                            <td><strong>RGB:</strong>213,241,252</td>
                                        </tr>
                                        <tr>
                                            <th style={{width:40}} scope="row"><div  style={{backgroundColor:"rgb(151, 223, 248)",height:30,width:40,borderRadius:5}}></div></th>
                                            <td><strong>HEX:</strong> #97dff8</td>
                                            <td><strong>RGB:</strong> 151,223,248</td>
                                        </tr>
                                        <tr>
                                        <th style={{width:40}} scope="row"><div  style={{backgroundColor:"rgb(105,207,245)",height:30,width:40,borderRadius:5}}></div></th>
                                            <td><strong>HEX:</strong> #69cff5</td>
                                            <td><strong>RGB:</strong> 105,207,245</td>
                                        </tr>
                                        <tr>
                                        <th style={{width:40}} scope="row"><div  style={{backgroundColor:"rgb(28,183,239)",height:30,width:40,borderRadius:5}}></div></th>
                                            <td><strong>HEX:</strong>#1cb7ef</td>
                                            <td><strong>RGB:</strong> 28,183,239</td>
                                        </tr>
                                        <tr>
                                        <th style={{width:40}} scope="row"><div  style={{backgroundColor:"rgb(0,173,209)",height:30,width:40,borderRadius:5}}></div></th>
                                            <td><strong>HEX:</strong>#00adef</td>
                                            <td><strong>RGB:</strong>0,173,209</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="text-left ml-4 p-3">
                        <h4 style={{ color: "#007bff" }}>Firma Yasal Bilgileri</h4>
                        <p className="m-2">Proaktif Dijital Yönetim ve Eğitim Sistemleri Ltd. Şti.</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Vergi Dairesi / No:</h5>Tepecik / 733 088 7853</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Ticaret Sicil No:</h5>30331</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Mersis No:</h5>proaktifdijital@hs05.kep.tr</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Yetkili:</h5>Barış CİNER (Sahip/Genel Müdür)</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>KEP Adresi:</h5>Barış CİNER (Sahip/Genel Müdür)</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Adres:</h5>Kocaeli Üniversitesi Teknoloji Geliştirme Bölgesi<br />
                        Vatan Cad., No: 83 / B-34 Yeniköy Merkez Mah.<br />
                        Başiskele 41725 Kocaeli/Turkey</p>
                        <p className="m-2"><h5 style={{ color: "#007bff" }}>Banka Hesap Bilgileri:</h5>
                        TL Hesabı İş Bankası TR390006400000112060542953<br />
                        TL Hesabı Ziraat Bankası TR770001002580933477895001</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
