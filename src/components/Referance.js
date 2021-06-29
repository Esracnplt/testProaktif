import React from 'react';

const Referance = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div>
                <div class="sample-header">
                    <img src="assests/img/teknopark.jpg" style={{height:"100vh"}} />
                </div>

                <div className="m-top71 sample-section-wrap" style={{ padding: 40 }}>
                    <div className="sample-section">
                        <div className="row p-4">
                            <div className="text-left ml-4 col-12">
                                <h4 style={{ color: "#007bff" }}>İş Birliklerimiz</h4>
                                <p className="m-2">Proaktif, sunduğu en son teknolojilere dayanan bulut tabanlı projelerde ve hizmetlerde yurtiçi ve yurtdışındaki en güvenli ve kapasiteli kurumlarla işbirliğine giderek kullanıcılarına optimum ve kesintisiz çalışma ortamı sunmaktadır. Proaktif ailesi olarak seçkin yerel ve global firma işbirliklerimiz ile hizmetinizdeyiz.</p>
                                <p className="m-2">Ar-Ge projelerimizin yanı sıra kurumsal yazılım, sistem ve donanım ihtiyaçlarını karşılamak ve altyapı temellerini oluşturmak ve güncel gelişen teknolojileri en hızlı şekilde kullanıcı firmalara ve müşterilerimize sunmak üzere sürekli yatırımlar yapılmaktadır. Bu kapsamda önemli iş birliklerine imza attığımız firmalar arasında GitHub, Vargonen, Cloudflare ve Amazon Web Services gibi global çözüm ortakları bulunmaktadır.</p>
                            </div>
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <div>
                                    <img src={'/assests/img/vargonen.jpeg'} className="p-2 img-fluid" height="100px" width="300px" />
                                </div>
                                <div>
                                    <img src={'/assests/img/aws.jpeg'} className="p-2 img-fluid" height="170px" width="300px" />
                                </div>
                                <div>
                                    <img src={'/assests/img/cloudflare.jpeg'} className="p-2 img-fluid" height="190px" width="300px" />
                                </div>
                            </div>
                        </div> <hr></hr>
                        <div className="text-left ml-4 mt-4 row">

                            <h4 style={{ color: "#007bff" }}> Amazon Web Services (AWS)</h4>
                            <p className="m-2">Amazon Web Services (AWS), dünyanın en kapsamlı ve en yaygın kullanılan bulut platformudur ve dünya çapındaki veri merkezlerinden 175'in üzerinde tam özellikli hizmet sunar. En hızlı büyüyen start-up firmaları, en büyük kuruluşlar ve önde gelen devlet kurumlarının dahil olduğu milyonlarca müşteri; maliyetleri azaltmak, daha çevik olmak ve daha hızlı inovasyon için AWS kullanmaktadır.</p>
                        </div>
                        <hr></hr>

                        <div className="text-left ml-4 mt-4 row">
                            <h4 style={{ color: "#007bff" }}>Cloudflare</h4>
                            <p className="m-2">Cloudflare, Inc. içerik dağıtım ağı, DDoS koruması, internet güvenliği ve alan adı sunucusu hizmetleri sağlayan ABD merkezli bir şirkettir. Hizmetleri ters vekil sunucusu mantığıyla çalışarak, ziyaretçi ile barındırma hizmeti arasında yer alır. Merkezi San Francisco'dadır ve dünyadaki 124. data merkezini İstanbul’da açmıştır.</p>
                        </div>
                        <hr></hr>
                        <div className="text-left ml-4 mt-4 row">
                            <h4 style={{ color: "#007bff" }}>Vargonen</h4>
                            <p className="m-2">2000 yılında kurulan Vargonen, hizmete başladığı günden bu yana uluslararası iş deneyimini, sektörün en iyileri ile yaptığı iş ortaklıkları ve büyük ölçekli altyapı yatırımları ile birleştirerek, yüksek performanslı bir altyapıyı erişilebilir maliyetlerle dünyada birçok noktada sunmaktadır. Dünya üzerinde coğrafi bir şekilde dağıtılmış durumda olan 8 ayrı veri merkezinden, kullanıcılarına kesintisiz teknoloji hizmeti sunan Vargonen, acil durum senaryoları çerçevesinde yürüttüğü başarılı kriz yönetimi ile müşteri ilişkilerinde destek ve çözümü birleştirmeyi ilke edinmiştir. Vargonen, Türkiye’nin açık ara en iyi bulut servislerini sağlayan kurumudur.</p>
                        </div>
                        <hr></hr>
                        <div className="text-left ml-4 mt-4 row">
                            <h4 style={{ color: "#007bff" }}>GitHub</h4>
                            <p className="m-2">GitHub, sürüm kontrol sistemi olarak Git kullanan yazılım geliştirme projeleri için web tabanlı bir depolama servisidir. GitHub özel depolar için ücretli üyelik seçenekleri sunarken, açık kaynaklı projeler için ücretsizdir. Mayıs 2011 itibarıyla GitHub açık kaynaklı projeler tarafından tercih edilen en popüler depolama servisidir.</p>
                        </div>
                        <hr></hr>
                        <div className="text-left ml-4 mt-4 row">
                            <h4 style={{ color: "#007bff" }}>Meslektaşlarımız</h4>
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <div>
                                    <img src={'/assests/img/mavi.jpg'} className="p-2 img-fluid" height="100px" width="300px" />
                                </div>
                                <div>
                                    <img src={'/assests/img/ulukom.jpg'} className="p-2 img-fluid" height="170px" width="300px" />
                                </div>
                                <div>
                                    <img src={'/assests/img/baybilgin.jpg'} className="p-2 img-fluid" height="190px" width="300px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    );
}

export default Referance;
