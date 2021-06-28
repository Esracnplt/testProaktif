import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';

const SupportEduFrom = () => {
  const [Data, setData] = useState({});
  const [HighSchool, setHighSchool] = useState([]);

  function fetchEdu() {
    debugger;
    axios.get("https://pro.proaktif.org/index/okullar")
    .then(response => response.json())
    .then((data) => {      
      setData(tabs =>
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
    })
      .catch((e) => {
        Swal.fire({
          title: "Eğitim Destekleri",
          confirmButtonText: "Tamam",
          showCloseButton: true,
          html: `<div style="color:red;">Bilgiler getirilirken hata oluştu!<br/>${e}</div>`,
          icon: 'error',
        });
      })
  }
  useEffect(() => {
    fetchEdu();
  }, []);
 console.log(HighSchool,Data,"data");
  return (
    <div className="card">
      <div className="card-header">
        <nav className="nav nav-pills flex-column flex-sm-row">
          <a className={HighSchool ? "flex-sm-fill text-sm-center nav-link active" : "flex-sm-fill text-sm-center nav-link"} onClick={() => setHighSchool(Data.okulLise)}>Liseler</a>
          <a className="flex-sm-fill text-sm-center nav-link" onClick={() => setHighSchool(Data.okulLise)}>Yüksek Okullar</a>
          <a className="flex-sm-fill text-sm-center nav-link" onClick={() => setHighSchool(Data.okulLise)}>Diğer Kurumlar</a>
        </nav>
      </div>
      <div className="card-body">
        <div className="proaktif-tab-content" dangerouslySetInnerHTML={{ __html: HighSchool }} style={{textAlign:"left", fontSize:"15px"}}>
         
        </div>
      </div>
    </div>
  );
}

export default SupportEduFrom;
