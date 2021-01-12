/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable no-unreachable */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Swal from 'sweetalert2'

export const MesajTurleri = {
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
}

const CreateDemo = forwardRef((props, ref) => {
    const [sunucuMesajTuru, setSunucuMesajTuru] = useState((props.currentValues && props.currentValues.sunucuMesajTuru) ? props.currentValues.sunucuMesajTuru : "")
    const [sunucuMesajExtraBilgi, setSunucuMesajExtraBilgi] = useState((props.currentValues && props.currentValues.sunucuMesajExtraBilgi) ? props.currentValues.sunucuMesajExtraBilgi : "")
    const [salindi, setSalindi] = useState((props.currentValues && props.currentValues.salindi) ? props.currentValues.salindi : "")
    const [sadi, setSadi] = useState((props.currentValues && props.currentValues.sadi) ? props.currentValues.sadi : "");
    const [timeoutId, setTimeoutId] = useState("");
    const [kayitBasarili, setKayitBasarili] = useState(false);
    const [createdDomainInfo, setCreatedDomainInfo] = useState((props.currentValues && props.currentValues.createdDomainInfo) ? props.currentValues.createdDomainInfo : null)

    const getCurrentValues = () => {
        return { inputs, inputsErrorMessages, sadi, salindi, sunucuMesajExtraBilgi, sunucuMesajTuru, createdDomainInfo }
    }

    useEffect(() => {
        checkValidations();
        return () => {
            if (timeoutId > 0)
                clearTimeout(timeoutId)
        }
    }, []);

    useEffect(() => {
        if (salindi !== "" && salindi !== sadi)
            deleteDemo();

        if (salindi === "" && sadi !== "") {
            setSunucuMesajExtraBilgi("");
            setSunucuMesajTuru(MesajTurleri.INFO);
            const producedTimeoutId = setTimeout(function () { solustur(); }, 5000);
            setTimeoutId(producedTimeoutId);
        }
    }, [sadi])

    useImperativeHandle(ref, () => {
        return {
            saveDemo: saveDemo,
            deleteDemo: deleteDemo,
            salindi: salindi,
            createdDomainInfo: createdDomainInfo,
        }
    });

    const inputsProperties =
    {
        ad: {
            placeHolder: "Adınız",
            title: "Adınız",
            minLength: 3,
            maxLength: 100,
            required: true,
        },
        soyad: {
            placeHolder: "Soyadınız",
            title: "Soyadınız",
            errorMessage: "",
            minLength: 3,
            maxLength: 100,
            required: true,
        },
        tckimlik: {
            placeHolder: "TC Kimlik No",
            title: "TC Kimlik No",
            length: 11,
            regexpMatch: RegExp(/^\d{11}$/),
            regexpRegularExample: " 11 karakterden oluşan rakam",
            required: true,
        },
        firmaadi: {
            placeHolder: "Firma Ünvanı (İlk kelime ile sunucunuz oluşturulacaktır)",
            title: "Firma Ünvanınızı Giriniz (En fazla 60 karakter)",
            minLength: 7,
            maxLength: 100,
            required: true,
        },
        telno: {
            placeHolder: "Tel.(Başına 0 Girmeyiniz)",
            title: "Telefon numaranızı başında 0 olmadan giriniz..",
            length: 12,
            regexpMatch: RegExp(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/),
            regexpRegularExample: "###-###-####",
            required: true,
        },
        dogtarihi: {
            placeHolder: "Doğum Tarihi (Gün.Ay.Yıl)",
            title: "Doğum tarihinizi Gün.Ay.Yıl olarak giriniz..",
            length: 10,
            regexpMatch: RegExp(/^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/),
            regexpRegularExample: "(01-31).(01-12).####",
            required: true,
        },
        email: {
            placeHolder: "E-Mail Adresi",
            title: "",
            minLength: 6,
            maxLength: 100,
            regexpMatch: RegExp(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
            required: true,
        },
        firmaweb: {
            placeHolder: "Firmanızın web adresi",
            title: "Firma Web adresinizi giriniz (Giriş sayfanızda görüntülenecektir)",
            minLength: 0,
            maxLength: 100,
            required: false,
        }
    };

    const [inputs, setInputs] = useState(
        (props.currentValues && props.currentValues.inputs)
            ? { ...props.currentValues.inputs }
            : {
                ad: "",
                soyad: "",
                tckimlik: "",
                firmaadi: "",
                telno: "",
                dogtarihi: "",
                email: "",
                firmaweb: "",
            });

    const [inputsErrorMessages, setInputsErrorMessages] = useState(
        (props.currentValues && props.currentValues.inputsErrorMessages)
            ? { ...props.currentValues.inputsErrorMessages }
            : {
                ad: "",
                soyad: "",
                tckimlik: "",
                firmaadi: "",
                telno: "",
                dogtarihi: "",
                email: "",
                firmaweb: "",
            });

    const checkValidations = (checkRequired = false) => {
        Object.keys(inputs).forEach(name => {
            checkValueValidation(name, inputs[name])
        });
        if (checkRequired || props.currentValues) {
            Object.keys(inputs).forEach(input => {
                if (inputsProperties[input] && inputsProperties[input].required && inputs[input] === "" && inputsErrorMessages[input] === "")
                    setInputsErrorMessages(inputErrors => ({ ...inputErrors, [input]: "Bu alanı doldurmak zorundasınız." }));
            });
        }
    }

    const checkValueValidation = (name, value) => {
        let errorMessage = "";
        if (value.length > 0) {
            if (inputsProperties[name].regexpMatch && !inputsProperties[name].regexpMatch.test(value)) {
                errorMessage = "Geçerli olmayan bir giriş yaptınız!." + (inputsProperties[name].regexpRegularExample ? " Geçerli örnek giriş: " + inputsProperties[name].regexpRegularExample : "");
            } else if (inputsProperties[name].length) {
                if (inputsProperties[name].length !== value.length) {
                    errorMessage = `Karakter uzunluğu ${inputsProperties[name].length} kadar olmak zorunda.`;
                }
            } else {
                if (inputsProperties[name].minLength && inputsProperties[name].minLength > value.length) {
                    errorMessage = `Karakter uzunluğu ${inputsProperties[name].minLength} dan küçük olamaz.`;
                }
                if (inputsProperties[name].maxLength && inputsProperties[name].maxLength <= value.length) {
                    errorMessage = `Karakter uzunluğu ${inputsProperties[name].maxLength} dan büyük olamaz.`;
                }
            }
        }
        setInputsErrorMessages(inptVls => ({ ...inptVls, [name]: errorMessage }))
    }

    const handleOnBlur = (event) => {
        return false;
        event.target.value = event.target.value.replace(/([\wöçşğüıİ])/gi,
            function (a, b) { return b.replace("I", "ı").toLowerCase() }).replace(/(^[a-zöçşğüı]|[\s|\.][a-zöçşğüı])/g,
                function (c, d) { return d.replace("i", "İ").toUpperCase() });
    }

    const handleOnBlurFirmaAdi = (event) => {
        if (salindi === "")
            if (inputs.firmaadi.length > 2) {
                let firmaparca = inputs.firmaadi.split(" ");
                setSadi(ingkontrol(firmaparca[0]));
            }
    }

    const handleOnFocusFirmaAdi = () => {
        if (timeoutId > 0) {
            clearTimeout(timeoutId);
            setTimeoutId("");
        }
    }

    const ingkontrol = (str) => {

        var charMap = { Ç: 'c', Ö: 'o', Ş: 's', İ: 'i', I: 'i', Ü: 'u', Ğ: 'g', ç: 'c', ö: 'o', ş: 's', ı: 'i', ü: 'u', ğ: 'g' };
        var str_array = str.split('');

        for (var i = 0, len = str_array.length; i < len; i++) {
            str_array[i] = charMap[str_array[i]] || str_array[i];
        }
        var strJoined = str_array.join('');
        var clearStr = strJoined.replace(" ", "").replace("--", "").replace(/[^a-z0-9-.çöşüğı]/gi, "").toLowerCase();

        return clearStr;
    }

    function solustur() {
        fetch("https://pro.proaktif.org/Kullanicikayit/solustur/?sadi=" + sadi)
            .then(response => response.json())
            .then(data => {
                setSunucuMesajExtraBilgi("");
                if (data.success === true) {
                    //setSunucuMesajTuru("Sunucunuz <span style='color:green;font-size:14px;font-weight:bold;'>" + data.result.name + " </span>adresi ile oluşturuldu.<img src='/img/ok.png' style='height: 20px;'></img>");
                    setSalindi(data.result.name);
                    setCreatedDomainInfo(data.result);
                    setSadi(data.result.name);
                    setSunucuMesajTuru(MesajTurleri.SUCCESS);
                }
                if (data.success === false) {
                    //setSunucuMesajTuru("Sunucunuz <span style='color:green;font-size:14px'>" + sadi.toLowerCase() + "pro.proaktif.org </span>adresi ile oluşturulamadı.<img src='/img/cancel.png' style='height: 20px;'></img>");
                    setSalindi("");
                    if (data.errors.length > 0 && data.errors.find(e => e.code == 81053))
                        setSunucuMesajExtraBilgi("Sunucu alan adı önceden alınmış bir alan adıdır!")
                    setSunucuMesajTuru(MesajTurleri.WARNING);
                }
            })
            .catch(e => {
                console.log("ERROR from function solustur: " + e);
                setSunucuMesajTuru(MesajTurleri.ERROR);
            });
    }

    const ShowSunucuMesajTuru = () => {
        let text = <></>;
        switch (sunucuMesajTuru) {
            case (MesajTurleri.INFO):
                text = (<>Sunucunuz <span style={{ color: "red", 'fontSize': '14px', 'fontWeight': '600' }}>{sadi.toLowerCase()}</span><span style={{ 'color': '#0f4aef', 'fontSize': '14px', 'fontWeight': '600' }}>demo{new Date().toISOString().substr(0, 10).replaceAll("-", "")}.proaktif.org</span> adresi ile hazırlanacaktır.<br />{sunucuMesajExtraBilgi}</>);
                break;
            case (MesajTurleri.SUCCESS):
                text = (<>Sunucunuz <span style={{ 'color': '#0f4aef', 'fontSize': '14px', 'fontWeight': 'bold' }}>{salindi}</span> adresi ile oluşturuldu.<img src='/img/ok.png' alt="success result" style={{ 'height': '15px' }}></img><br />{sunucuMesajExtraBilgi}</>);
                break;
            case (MesajTurleri.WARNING):
                text = (<>Sunucunuz <span style={{ "color": "green", "fontSize": "14px" }}>{sadi.toLowerCase()}</span>demo{new Date().toISOString().substr(0, 10).replaceAll("-", "")}.proaktif.org adresi ile oluşturulamadı.<img src='/img/cancel.png' alt="error result" style={{ height: "15px" }}></img><br />{sunucuMesajExtraBilgi}</>);
                break;
            case (MesajTurleri.ERROR):
                text = (<>Kayıt İşlemi sırasında hata oluştu. Lütfen daha sonra tekrar deneyiniz.<br />{sunucuMesajExtraBilgi}</>);
                break;
        }
        return text;
    }

    const handleChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        if (name === "telno")
            value = phoneMask(value);

        if (name === "dogtarihi")
            value = dateMask(value);

        if (name === "firmaweb")
            value = webSiteMask(value);


        checkValueValidation(name, value);
        setInputs(inptVls => ({ ...inptVls, [name]: value }));
    }

    const phoneMask = (val) => {
        val = val.replace(/ /gm, '').replace(/[^\d]/g, "");

        val = (val.length === 1 && val !== "5") ? val = "5" + val : val;
        val = val.length >= 4 ? `${val.substring(0, 3)}-${val.substring(3, val.length)}` : val;
        val = val.length >= 8 ? `${val.substring(0, 7)}-${val.substring(7, val.length)}` : val;
        val = val.length > 12 ? `${val.substring(0, 12)}` : val;

        return val;
    }

    const dateMask = (val) => {
        val = val.replace(/ /gm, '').replace(/[^\d]/g, "");
        val = val.length >= 3 ? `${val.substring(0, 2)}.${val.substring(2, val.length)}` : val;
        val = val.length >= 6 ? `${val.substring(0, 5)}.${val.substring(5, val.length)}` : val;
        val = val.length > 10 ? `${val.substring(0, 10)}` : val;
        return val;
    }

    const webSiteMask = (val) => {
        if (val.length === 1)
            val = "www." + val;
        else if (val.length === 4)
            val = "";
        else if (val.length > 4)
            val = "www" + val.substring(val.indexOf('.'), val.length);

        return val;
    }

    const inputsToFetchData = () => {
        let dataQuery = "";
        Object.keys(inputs).forEach(name => {
            dataQuery += `&${name}=${inputs[name]}`;
        })
        return dataQuery;
    }

    const saveDemo = async () => {
        checkValidations();
        if (Object.values(inputsErrorMessages).find(ie => ie !== "") || Object.keys(inputs).find(i => (inputs[i] === "" && inputsProperties[i].required))) {
            return { saveResult: false, currentValues: getCurrentValues() };
        } else {
            const fatchData = inputsToFetchData();

            Swal.fire({
                title: "Demo oluşturma",
                showCloseButton: true,
                icon: "info",
                allowOutsideClick: false,
                html: "<div>Demo  sunucunuz oluşturuluyor...<br />Lütfen bekleyiniz.</div>",
            });

            const result = await fetch("https://pro.proaktif.org/Kullanicikayit/demokayit/?sadi=" + sadi + fatchData)
                .then(response => response.json())
                .then(async (data) => {
                    if (data.sonuc === 'OK') {
                        setKayitBasarili(true);
                        await Swal.fire({
                            title: "Kayıt Başarılı",
                            text: data.mesaj,
                            type: "success",
                            allowOutsideClick: false,
                            confirmButtonText: "Tamam"
                        })
                            .then((result) => {
                                window.open("http://" + sadi + '/&ID=' + data.kullanicikisiidx, '_blank');
                            });
                        return true;
                    }
                    else {
                        let title = "", type = "";
                        if (data.sonuc === "kayitli") {
                            title = "Kayıtlı Kullanıcı";
                            type = "error";
                        }
                        else if (data.sonuc === "hata") {
                            title = "Uyarı";
                            type = "info";
                        }
                        else if (data.sonuc === "dogrulanamiyor") {
                            title = "Hata";
                            type = "warning";
                        }

                        await Swal.fire({
                            title: title,
                            text: data.mesaj,
                            type: type,
                            allowOutsideClick: false,
                            confirmButtonText: "Tamam"
                        })

                        return false;
                    }
                })
                .catch(async (e) => {
                    await Swal.fire({
                        title: "Hata Oluştu",
                        text: e,
                        type: "error",
                        allowOutsideClick: false,
                        confirmButtonText: "Tamam"
                    });
                    return false;//{ saveResult: false, currentValues: getCurrentValues }
                });

            return { saveResult: result, currentValues: getCurrentValues() };
        }
    }

    const deleteDemo = (domainInfo = createdDomainInfo) => {
        fetch("https://pro.proaktif.org/Kullanicikayit/subdomainsil?domainName=" + domainInfo.name + "&domainId=" + domainInfo.id)
            .then(result => result.json())
            .then(result => console.log(result))
    }

    return (
        <div>
            {sunucuMesajTuru !== "" && <div className={`proaktif-alert ${sunucuMesajTuru}`}><ShowSunucuMesajTuru /></div>}
            <div className="proaktif-form-group">
                <input type="text" name="firmaadi" onChange={handleChange} onBlur={handleOnBlurFirmaAdi} onFocus={handleOnFocusFirmaAdi} id="firmaadi" placeholder={inputsProperties.firmaadi.placeHolder} value={inputs.firmaadi} title={inputsProperties.firmaadi.title} className={`proaktif-input ${inputsErrorMessages.firmaadi.length > 0 && ' error'} `} />
                {inputsErrorMessages.firmaadi.length > 0 && (<span className="error-message">{inputsErrorMessages.firmaadi}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="firmaweb" onChange={handleChange} id="firmaweb" placeholder={inputsProperties.firmaweb.placeHolder} value={inputs.firmaweb} title={inputsProperties.firmaweb.title} className={`proaktif-input ${inputsErrorMessages.firmaweb.length > 0 && ' error'} `} />
                {inputsErrorMessages.firmaweb.length > 0 && (<span className="error-message">{inputsErrorMessages.firmaweb}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="ad" onBlur={handleOnBlur} onChange={handleChange} id="ad" placeholder={inputsProperties.ad.placeHolder} value={inputs.ad} className={`proaktif-input ${inputsErrorMessages.ad.length > 0 && ' error'} `} />
                {inputsErrorMessages.ad.length > 0 && (<span className="error-message">{inputsErrorMessages.ad}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="soyad" onBlur={handleOnBlur} onChange={handleChange} id="soyad" placeholder={inputsProperties.soyad.placeHolder} value={inputs.soyad} className={`proaktif-input ${inputsErrorMessages.soyad.length > 0 && ' error'} `} />
                {inputsErrorMessages.soyad.length > 0 && (<span className="error-message">{inputsErrorMessages.soyad}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="tckimlik" onChange={handleChange} id="tckimlik" placeholder={inputsProperties.tckimlik.placeHolder} value={inputs.tckimlik} className={`proaktif-input ${inputsErrorMessages.tckimlik.length > 0 && ' error'} `} />
                {inputsErrorMessages.tckimlik.length > 0 && (<span className="error-message">{inputsErrorMessages.tckimlik}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="dogtarihi" onChange={handleChange} placeholder={inputsProperties.dogtarihi.placeHolder} id="dogtarihi" value={inputs.dogtarihi} title={inputsProperties.dogtarihi.title} className={`proaktif-input ${inputsErrorMessages.dogtarihi.length > 0 && ' error'} `} />
                {inputsErrorMessages.dogtarihi.length > 0 && (<span className="error-message">{inputsErrorMessages.dogtarihi}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="telno" onChange={handleChange} placeholder={inputsProperties.telno.placeHolder} id="telno" value={inputs.telno} title={inputsProperties.telno.title} className={`proaktif-input ${inputsErrorMessages.telno.length > 0 && ' error'} `} />
                {inputsErrorMessages.telno.length > 0 && (<span className="error-message">{inputsErrorMessages.telno}</span>)}
            </div>
            <div className="proaktif-form-group">
                <input type="text" name="email" onChange={handleChange} id="emailkayit" placeholder={inputsProperties.email.placeHolder} value={inputs.email} className={`proaktif-input ${inputsErrorMessages.email.length > 0 && ' error'} `} />
                {inputsErrorMessages.email.length > 0 && (<span className="error-message">{inputsErrorMessages.email}</span>)}
            </div>
        </div>
    );
})

export default CreateDemo;