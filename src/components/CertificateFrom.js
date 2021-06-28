import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function CertificateFrom() {
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
  const showSertifikaKontrolSwall = (sertifikaKontrolUyariMesaji,result) => {
    const sertifikaNo = inputSertifikaNo.current.value;
            axios.post("https://pro.proaktif.org/sertifika/sertifikadurumkontrol?BelgeNo=" + sertifikaNo)
              .then(response => response.json())
              .then(data => {
                let aciklama = "";
                if (data.uyari === "0") {
                  if (data.egitmen)
                    aciklama = '<div style="text-align:left"><b>Sertifika Sahibi:</b> ' + data.adsoyad + '<br><b>Eğitmen:</b> ' + data.egitmen + '<br><b>Sertifika Tarihi:</b> ' + data.zaman + '</div>';
                  else
                    aciklama = '<div style="text-align:left"><b>Sertifika Sahibi:</b> ' + data.adsoyad + '<br><b>Sertifika Tarihi:</b> ' + data.zaman + '</div>';
                  Swal.fire({
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
          
    
  }

  const btnSertifikaKontrolClick = () => {
    showSertifikaKontrolSwall(sertifikaKontrolUyariMesaji);
  }
    return (
        <div>
            <form>
                <input type="text" id="sertifikano" ref={inputSertifikaNo} className="react-tel-input form-control" placeholder="TC Kimlik veya Sertifika No.."></input>
                <div className="d-flex justify-content-center align-items-center mt-2">
                    <button className="btn btn-primary" onClick={()=>btnSertifikaKontrolClick()}>Sertifika Arama</button>
                </div>
                <hr/>
                <p>Sorgulamak istediğiniz Sertifika veya TC Kimlik Numarasını Giriniz..</p>
            </form>
        </div>
    );
}
