import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Swal from 'sweetalert2';

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
            placeHolder: "Ad??n??z",
            title: "Ad??n??z",
            minLength: 3,
            maxLength: 100,
            required: true,
        },
        soyad: {
            placeHolder: "Soyad??n??z",
            title: "Soyad??n??z",
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
            regexpRegularExample: " 11 karakterden olu??an rakam",
            required: true,
        },
        firmaadi: {
            placeHolder: "Firma ??nvan?? (??lk kelime ile sunucunuz olu??turulacakt??r)",
            title: "Firma ??nvan??n??z?? Giriniz (En fazla 60 karakter)",
            minLength: 7,
            maxLength: 100,
            required: true,
        },
        telno: {
            placeHolder: "Tel.(Ba????na 0 Girmeyiniz)",
            title: "Telefon numaran??z?? ba????nda 0 olmadan giriniz..",
            length: 12,
            regexpMatch: RegExp(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/),
            regexpRegularExample: "###-###-####",
            required: true,
        },
        dogtarihi: {
            placeHolder: "Do??um Tarihi (G??n.Ay.Y??l)",
            title: "Do??um tarihinizi G??n.Ay.Y??l olarak giriniz..",
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
            placeHolder: "Firman??z??n web adresi",
            title: "Firma Web adresinizi giriniz (Giri?? sayfan??zda g??r??nt??lenecektir)",
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
                    setInputsErrorMessages(inputErrors => ({ ...inputErrors, [input]: "Bu alan?? doldurmak zorundas??n??z." }));
            });
        }
    }

    const checkValueValidation = (name, value) => {
        let errorMessage = "";
        if (value.length > 0) {
            if (inputsProperties[name].regexpMatch && !inputsProperties[name].regexpMatch.test(value)) {
                errorMessage = "Ge??erli olmayan bir giri?? yapt??n??z!." + (inputsProperties[name].regexpRegularExample ? " Ge??erli ??rnek giri??: " + inputsProperties[name].regexpRegularExample : "");
            } else if (inputsProperties[name].length) {
                if (inputsProperties[name].length !== value.length) {
                    errorMessage = `Karakter uzunlu??u ${inputsProperties[name].length} kadar olmak zorunda.`;
                }
            } else {
                if (inputsProperties[name].minLength && inputsProperties[name].minLength > value.length) {
                    errorMessage = `Karakter uzunlu??u ${inputsProperties[name].minLength} dan k??????k olamaz.`;
                }
                if (inputsProperties[name].maxLength && inputsProperties[name].maxLength <= value.length) {
                    errorMessage = `Karakter uzunlu??u ${inputsProperties[name].maxLength} dan b??y??k olamaz.`;
                }
            }
        }
        setInputsErrorMessages(inptVls => ({ ...inptVls, [name]: errorMessage }))
    }

    const handleOnBlur = (event) => {
        return false;
        /*
        event.target.value = event.target.value.replace(/([\w??????????????])/gi,
            function (a, b) { return b.replace("I", "??").toLowerCase() }).replace(/(^[a-z????????????]|[\s|\.][a-z????????????])/g,
                function (c, d) { return d.replace("i", "??").toUpperCase() });
                */
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

        var charMap = { ??: 'c', ??: 'o', ??: 's', ??: 'i', I: 'i', ??: 'u', ??: 'g', ??: 'c', ??: 'o', ??: 's', ??: 'i', ??: 'u', ??: 'g' };
        var str_array = str.split('');

        for (var i = 0, len = str_array.length; i < len; i++) {
            str_array[i] = charMap[str_array[i]] || str_array[i];
        }
        var strJoined = str_array.join('');
        var clearStr = strJoined.replace(" ", "").replace("--", "").replace(/[^a-z0-9-.????????????]/gi, "").toLowerCase();

        return clearStr;
    }

    function solustur() {
        fetch("https://pro.proaktif.org/Kullanicikayit/solustur/?sadi=" + sadi)
            .then(response => response.json())
            .then(data => {
                setSunucuMesajExtraBilgi("");
                if (data.success === true) {
                    //setSunucuMesajTuru("Sunucunuz <span style='color:green;font-size:14px;font-weight:bold;'>" + data.result.name + " </span>adresi ile olu??turuldu.<img src='/img/ok.png' style='height: 20px;'></img>");
                    setSalindi(data.result.name);
                    setCreatedDomainInfo(data.result);
                    setSadi(data.result.name);
                    setSunucuMesajTuru(MesajTurleri.SUCCESS);
                }
                if (data.success === false) {
                    //setSunucuMesajTuru("Sunucunuz <span style='color:green;font-size:14px'>" + sadi.toLowerCase() + "pro.proaktif.org </span>adresi ile olu??turulamad??.<img src='/img/cancel.png' style='height: 20px;'></img>");
                    setSalindi("");
                    if (data.errors.length > 0 && data.errors.find(e => e.code === 81053))
                        setSunucuMesajExtraBilgi("Sunucu alan ad?? ??nceden al??nm???? bir alan ad??d??r!")
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
                text = (<>Sunucunuz <span style={{ color: "red", 'fontSize': '14px', 'fontWeight': '600' }}>{sadi.toLowerCase()}</span><span style={{ 'color': '#0f4aef', 'fontSize': '14px', 'fontWeight': '600' }}>demo{new Date().toISOString().substr(0, 10).replaceAll("-", "")}.proaktif.org</span> adresi ile haz??rlanacakt??r.<br />{sunucuMesajExtraBilgi}</>);
                break;
            case (MesajTurleri.SUCCESS):
                text = (<>Sunucunuz <span style={{ 'color': '#0f4aef', 'fontSize': '14px', 'fontWeight': 'bold' }}>{salindi}</span> adresi ile olu??turuldu.<img src='/img/ok.png' alt="success result" style={{ 'height': '15px' }}></img><br />{sunucuMesajExtraBilgi}</>);
                break;
            case (MesajTurleri.WARNING):
                text = (<>Sunucunuz <span style={{ "color": "green", "fontSize": "14px" }}>{sadi.toLowerCase()}</span>demo{new Date().toISOString().substr(0, 10).replaceAll("-", "")}.proaktif.org adresi ile olu??turulamad??.<img src='/img/cancel.png' alt="error result" style={{ height: "15px" }}></img><br />{sunucuMesajExtraBilgi}</>);
                break;
            default://case (MesajTurleri.ERROR):
                text = (<>Kay??t ????lemi s??ras??nda hata olu??tu. L??tfen daha sonra tekrar deneyiniz.<br />{sunucuMesajExtraBilgi}</>);
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
                title: "Demo olu??turma",
                showCloseButton: true,
                icon: "info",
                allowOutsideClick: false,
                html: "<div>Demo  sunucunuz olu??turuluyor...<br />L??tfen bekleyiniz.</div>",
            });

            const result = await fetch("https://pro.proaktif.org/Kullanicikayit/demokayit/?sadi=" + sadi + fatchData)
                .then(response => response.json())
                .then(async (data) => {
                    if (data.sonuc === 'OK') {
                        setKayitBasarili(true);
                        await Swal.fire({
                            title: "Kay??t Ba??ar??l??",
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
                            title = "Kay??tl?? Kullan??c??";
                            type = "error";
                        }
                        else if (data.sonuc === "hata") {
                            title = "Uyar??";
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
                        title: "Hata Olu??tu",
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

            <form>
                <input type="text" name="firmaadi" onChange={handleChange} onBlur={handleOnBlurFirmaAdi} onFocus={handleOnFocusFirmaAdi} id="firmaadi" value={inputs.firmaadi} title={inputsProperties.firmaadi.title} className={`react-tel-input form-control ${inputsErrorMessages.firmaadi.length > 0 && ' error'} `}  placeholder="Firman??z??n ??nvan??" />
                {inputsErrorMessages.firmaadi.length > 0 && (<span className="error-message">{inputsErrorMessages.firmaadi}</span>)}
                <input type="text" name="firmaweb" onChange={handleChange} id="firmaweb" value={inputs.firmaweb} title={inputsProperties.firmaweb.title} className={`react-tel-input form-control ${inputsErrorMessages.firmaweb.length > 0 && ' error'} `}  placeholder="Firman??z??n web sitesi" />
                {inputsErrorMessages.firmaweb.length > 0 && (<span className="error-message">{inputsErrorMessages.firmaweb}</span>)}
                <input type="text" name="ad" onBlur={handleOnBlur} onChange={handleChange} id="ad" value={inputs.ad} className={`react-tel-input form-control ${inputsErrorMessages.ad.length > 0 && ' error'} `}  placeholder="Ad??n??z " />
                {inputsErrorMessages.ad.length > 0 && (<span className="error-message">{inputsErrorMessages.ad}</span>)}
                <input type="text" name="tckimlik" onChange={handleChange} id="tckimlik" value={inputs.tckimlik} className={`react-tel-input form-control ${inputsErrorMessages.tckimlik.length > 0 && ' error'} `}  placeholder=" Tc Kimlik" />
                {inputsErrorMessages.tckimlik.length > 0 && (<span className="error-message">{inputsErrorMessages.tckimlik}</span>)}
                <input type="date" name="dogtarihi" onChange={handleChange} id="dogtarihi" value={inputs.dogtarihi} title={inputsProperties.dogtarihi.title} className={`react-tel-input form-control ${inputsErrorMessages.dogtarihi.length > 0 && ' error'} `}  placeholder="Do??um tarihi" />
                {inputsErrorMessages.dogtarihi.length > 0 && (<span className="error-message">{inputsErrorMessages.dogtarihi}</span>)}
                <input type="text" name="telno" onChange={handleChange} id="telno" value={inputs.telno} title={inputsProperties.telno.title} className={`react-tel-input form-control ${inputsErrorMessages.telno.length > 0 && ' error'} `}  placeholder="Tel No" />
                {inputsErrorMessages.telno.length > 0 && (<span className="error-message">{inputsErrorMessages.telno}</span>)}
                <input type="text" name="email" onChange={handleChange} id="emailkayit" value={inputs.email} className={`react-tel-input form-control ${inputsErrorMessages.email.length > 0 && ' error'} `}  placeholder="Email" />
                {inputsErrorMessages.email.length > 0 && (<span className="error-message">{inputsErrorMessages.email}</span>)}
            </form>
        </div>
    )
})

export default CreateDemo;