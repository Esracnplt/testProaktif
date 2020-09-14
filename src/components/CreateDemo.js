import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Swal from 'sweetalert2'

export const MesajTurleri = {
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
}

const CreateDemo = forwardRef((props, ref) => {
    const [sunucuMesaj, setSunucuMesaj] = useState((props.currentValues && props.currentValues.sunucuMesaj) ? props.currentValues.sunucuMesaj : "")
    const [sadi, setSadi] = useState((props.currentValues && props.currentValues.setSadi) ? props.currentValues.setSadi : "");
    const [salindi, setSalindi] = useState((props.currentValues && props.currentValues.salindi) ? props.currentValues.salindi : "")
    const [timeoutId, setTimeoutId] = useState("");

    useEffect(() => {
        checkValidations();
        return () => {
            if (timeoutId > 0)
                clearTimeout(timeoutId)
        }
    }, []);

    useImperativeHandle(ref, () => {
        return {
            saveDemo: saveDemo
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

    const handleOnBlur=(event)=>{
        return false;
        event.target.value = event.target.value.replace(/([\wöçşğüıİ])/gi, 
        function(a, b){return b.replace("I","ı").toLowerCase()}).replace(/(^[a-zöçşğüı]|[\s|\.][a-zöçşğüı])/g, 
        function(c, d){return d.replace("i","İ").toUpperCase()});
    }

    useEffect(() => {
        if (sadi !== "") {
            setSunucuMesaj(MesajTurleri.INFO);
            const producedTimeoutId = setTimeout(function () { solustur(); }, 5000);
            setTimeoutId(producedTimeoutId);
        }
    }, [sadi])

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
        fetch("https://proaktif.org/Kullanicikayit/solustur/?sadi=" + sadi)
            .then(data => {
                if (data.success === true) {
                    //setSunucuMesaj("Sunucunuz <span style='color:green;font-size:14px;font-weight:bold;'>" + data.result.name + " </span>adresi ile oluşturuldu.<img src='/img/ok.png' style='height: 20px;'></img>");
                    setSunucuMesaj(MesajTurleri.SUCCESS);
                    setSadi(data.result.name);
                    setSalindi(data.result.name);
                }
                if (data.success === false) {
                    //setSunucumesaj("Sunucunuz <span style='color:green;font-size:14px'>" + sadi.toLowerCase() + "pro.proaktif.org </span>adresi ile oluşturulamadı.<img src='/img/cancel.png' style='height: 20px;'></img>");
                    setSunucuMesaj(MesajTurleri.WARNING);
                    setSalindi("");
                }
            })
            .catch(e => {
                console.log("ERROR from function solustur: " + e);
                setSunucuMesaj(MesajTurleri.ERROR);
            });
    }

    const ShowSunucuMesaj = () => {
        let text = <></>;
        switch (sunucuMesaj) {
            case (MesajTurleri.INFO):
                text = (<>Sunucunuz <span style={{ color: "red" }}>{sadi}</span>demo.proaktif.org adresi ile hazırlanacaktır.</>);
                break;
            case (MesajTurleri.SUCCESS):
                text = (<>Sunucunuz <span style={{ 'color': 'green', 'font-size': '14px', 'font-weight': 'bold' }}>{sadi}</span> adresi ile oluşturuldu.<img src='/img/ok.png' alt="success result" style={{ 'height': '20px' }}></img></>);
                break;
            case (MesajTurleri.WARNING):
                text = (<>Sunucunuz <span style={{ "color": "green", "font-size": "14px" }}>{sadi.toLowerCase() + "pro.proaktif.org"}</span>adresi ile oluşturulamadı.<img src='/img/cancel.png' alt="error result" style={{ height: "20px" }}></img></>);
                break;
            case (MesajTurleri.ERROR):
                text = (<>Kayıt İşlemi sırasında hata oluştu. Lütfen daha sonra tekrar deneyiniz.</>);
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
            return { saveResult: false, currentValues: { inputs, inputsErrorMessages, sadi, salindi, sunucuMesaj } };
        } else {
            const fatchData = inputsToFetchData();
            const result = await fetch("https://proaktif.org/Kullanicikayit/demokayit/?sadi=" + sadi + fatchData)
                .then(async (data) => {
                    if (data.sonuc === 'OK') {
                        await Swal.fire({
                            title: "Kayıt Başarılı",
                            text: data.mesaj,
                            type: "success",
                            confirmButtonText: "Tamam"
                        })
                            .then((result) => {
                                //window.open("http://" + sadi + '/&ID=' + data.kullanicikisiidx, '_blank');
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
                            confirmButtonText: "Tamam"
                        });

                        return false;
                    }
                })
                .catch(async (e) => {
                    await Swal.fire({
                        title: "Hata Oluştu",
                        text: e,
                        type: "error",
                        confirmButtonText: "Tamam"
                    });
                    return false;
                })
            return { saveResult: result, currentValues: { inputs, inputsErrorMessages, sadi, salindi, sunucuMesaj } };
        }
    }

    return (
        <div>
            {sunucuMesaj !== "" && <div className={`proaktif-alert ${sunucuMesaj}`}><ShowSunucuMesaj /></div>}
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