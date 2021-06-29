import React from 'react';

export default function Products() {
  return (
    <div>
      <div class="sample-header">
        <img src="assests/img/teknopark.jpg" style={{height:"100vh"}} />
      </div>

      <div className="m-top71 sample-section-wrap" style={{ padding: 40 }}>
        <div className="sample-section">
          <div className="text-left ml-4">
            <h4 style={{ color: "#007bff" }}>Proaktif Dış Ticaret Yönetim Sistemi ve Çevrimiçi Web Yazılımı</h4>
            <p className="m-2">
              Önemli bir ihtiyaç ve talebi karşılamak üzere, temelleri 90’lı yıllara uzanan ve ilk zamanlarda masaüstü uygulama olarak hizmet veren ürünümüz, teknolojinin gelişmesi ve internetin yaygınlaşmasıyla birlikte 2000’li yılların başların itibaren web tabanlı çevrimiçi bir hizmet çözümüne dönüşmüştür. Son olarak mikroservisler mimarisi esas alınarak ve özgün bir yaklaşım ile Teknopark bünyesinde bir Ar-Ge projesi kapsamında geliştirilerek yenilikçi, değişen kullanıcı/sistem isterlerine karşın dinamik ve dayanıklı sistem yapısıyla yeni bir ürün olarak tasarımları yapılarak gerçekleştirilmiş bulunmaktadır. Bu katma değerlikli özellikleri ile ulusal ölçekte olduğu kadar global hizmet sunma ve yurtdışını satış potansiyeli ile ürünümüz sürekli geliştirilebilir ve kullanıcı firmalara (müşterilere) artan kalite standartlarında hizmet verebilmektedir.</p>
            <p className="m-2">Son dönemde, uzman yazılım ve sistem mühendislerinden oluşan Proaktif Ar-Ge ekibinin yoğun çalışmalarıyla aşağıda belirtilen modüller mikroservisler mimarisiyle yapılandırılarak esnek ve modüler çözüm stratejisi ile web/sunucu uygulamalarının hem teknik hem de ticari başarımı üst düzeylere çıkarılmış bulunmaktadır. Ürünümüzün, global pazarlara uygun gerekli tüm düzenlemeler yapılarak yurtdışına pazarlanmasına yönelik teknik olduğu kadar uluslararası mevzuat açısından da önemli çalışmalar planlanmış olup takvim içerisinde projelendirilecektir.</p>
          </div>
          <div className="row p-4">
            <div className="text-left  col-lg-6 col-md-6 col-xs-12">
              <h4 style={{ color: "#007bff" }}>Detay Beyan</h4>
              <p className="m-2">İthalat, ihracat ve antrepo beyanname yazımı ve gümrük tescil işlemleri</p>
              <p className="m-2">Beyanname vergi hesaplama, kopyalama, Excel veri aktarımı, XML veri aktarımı, ayrıntılı rapor, toplu beyanname dökümleri, beyanname taslak dökümleri</p>
              <p className="m-2">Beyannameden dolaşım belgesi düzenleme, onay işlemleri</p>
              <p className="m-2">Beyannameden elektronik ihracat faturası hazırlama</p>
              <p className="m-2">Birlik onay işlemleri ve ödemeleri</p>
              <p className="m-2">Elektronik Arşivleme</p>
              <p className="m-2">Beyannameden fatura ve dekont oluşturma</p>
            </div>

            <div className="col-lg-6 col-md-6 col-xs-12 align-items-center justify-content-center">
              <img src={'/assests/img/detaybeyan.jpg'} className="p-2 img-fluid" height="200px" width="350px" />
            </div>
          </div> <hr></hr>
          <div className="text-left ml-4 mt-4 row">
            <div className="col-lg-6 col-md-6 col-xs-12">
              <img src={'/assests/img/ozetbeyan.jpg'} className="p-2 img-fluid" height="150px" width="350px" />
            </div>
            <div className="col-lg-6 col-md-6 col-xs-12">
              <h4 style={{ color: "#007bff" }}>Özet Beyan</h4>
              <p className="m-2">Deniz ithalat, deniz ihracat ve tüm özet beyan rejim işlemleri ve gümrük onaylarının alınması</p>
              <p className="m-2">Beyan kopyalama, senet kopyalama, özet beyan listesi</p>
              <p className="m-2">Özet beyan taslak dökümleri</p>
              <p className="m-2">Elektronik arşivleme</p>
            </div>
          </div>
          <hr></hr>
          <div className="row mt-4 p-4">
            <div className="text-left ml-4 col">
              <h4 style={{ color: "#007bff" }}>NCTS</h4>
              <p className="m-2">TR ve T1 transit beyanlarının yazılması ve gümrük tescil işlemleri</p>
              <p className="m-2">Beyanların statülerinin gümrük sisteminden çevrimiçi güncellenmesi</p>
              <p className="m-2">İthalat/ihracat beyanından otomatik transit beyanı oluşturma</p>
              <p className="m-2">Elektronik arşivleme</p>
              <p className="m-2">Teminat hesaplama</p>
              <p className="m-2">Beyanname taslak dökümleri</p>
            </div>

            <div className="col align-items-center justify-content-center">
              <img src={'/assests/img/ncts.jpg'} className="p-2 mr-4" height="200px" width="320px" />
            </div>
          </div>
          <hr></hr>
          <div className="text-left ml-4 mt-4 row">
            <div className="col-lg-6 col-md-6 col-xs-12">
              <img src={'/assests/img/cari.jpg'} className="p-2 img-fluid" height="150px" width="350px" />
            </div>
            <div className="col-lg-6 col-md-6 col-xs-12">
              <h4 style={{ color: "#007bff" }}>Cari</h4>
              <p className="m-2">Hizmet faturası, borç dekontu, SMM, makbuz, banka belgesi işlemleri</p>
              <p className="m-2">Firma cari takip</p>
              <p className="m-2">Cari işlem dökümü</p>
              <p className="m-2">E-fatura, e-arşiv işlemleri</p>
              <p className="m-2">Cari işlem dökümü</p>
              <p className="m-2">E-fatura, e-arşiv işlemleri</p>
              <p className="m-2">Ayrıntılı raporlar (borçlular, alacaklılar, cari belge raporları, FS raporları)</p>
              <p className="m-2">Elektronik arşivleme</p>
            </div>
          </div>
          <hr></hr>
          <div className="row mt-4 ">
            <div className="text-left  col-lg-6 col-md-6 col-xs-12">
              <h4 style={{ color: "#007bff" }}>Antrepo/Takip</h4>
              <p className="m-2">Antrepo beyanname listesi</p>
              <p className="m-2">Antrepo düşüm raporu, antrepoda kalan malların takibi</p>
            </div>

            <div className="col-lg-6 col-md-6 col-xs-12 align-items-center justify-content-center">
              <img src={'/assests/img/antrepotakip.jpg'} className="p-2 img-fluid" height="200px" width="250px" />
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
