import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import Swal from 'sweetalert2';
import { injectIntl } from "react-intl";
import translate from '../i18nProvider/translate';


function ContactForm(props) { 
    const{intl}=props;
    const [selectedOption, setSelectedOption] = useState();
    const options = [
        { value: 'Genel', label: 'Genel' },
        { value: 'BilgiTalebi', label: 'Bilgi Talebi' },
        { value: 'Demo', label: 'Demo' },
        { value: 'OneriSikayet', label: 'Öneri-Şikayet' },
    ];
    function handleChange(e) {
        console.log(e);
        setSelectedOption(e);
    }
    const defaultValue = {
        "email": "",
        "phoneNumber": "",
        "name": "",
        "topic": selectedOption,
        "message": ""
    };

    const [state, setState] = useState({ ...defaultValue });
    const [topicSetted, setTopicSetted] = useState(false);

    const changeState = (e) => {
        e.preventDefault();
        let { id, value } = e.target;
        setState(s => ({ ...s, [id]: value }));
    }


    const sendEmail = (comp) => {
        if (state.name && state.email && state.phoneNumber && state.topic && state.message) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: "subject=" + state.topic + "&message=" + state.message + "&name=" + state.name + "&email=" + state.email + "&phonenumber=" + state.phoneNumber
            };
            fetch("https://pro.proaktif.org/netkozanet/contactform/contactform.php", requestOptions)
                .then(r => r.json()).then(result => {
                    if (result && result.sonuc) {
                        setState({ ...defaultValue, topic: state.topic });
                        Swal.fire({
                            icon: "success",
                            title: "Mesajınız Gönderildi. Teşekkür ederiz.",
                            text: "(Bir Kopyası Mailinize Gönderilmiştir)"
                        })
                    } else
                        throw "Sunucu Tarafında Gönderim Hatası Var";
                })
                .catch(e => {
                    Swal.fire({
                        icon: "error",
                        title: "Mesajınız Gönderilemedi",
                        html: "Lütfen tekrardan deneyiniz<br/> veya <br/><span style='font-weight:700'>info@proaktif.org</span> adresine talebinizi mail olarak gönderiniz"
                    })
                })
        } else {
            Swal.fire({
                icon: "warning",
                text: "Lütfen boş alanları doldurunuz!"
            })
        }
    }

    const [phone, setPhone] = useState();
    const MenuStyle = {
		option: (base, state) => ({
			...base,
			color: state.isFocused ? '#00adef' : 'black',
			fontSize: 15,
			position: 'relative',
			top: 0,
		}),
	};
    return (
        <div>
            <form>
                <input className="react-tel-input form-control" onChange={changeState} value={state.name} id="name" placeholder={intl.formatMessage({ id: "name-surname" })}/>
                <input className="react-tel-input mt-2 form-control" onChange={changeState} value={state.email} id="email" placeholder="E-Mail" />
                <input className="react-tel-input mt-2 form-control"onChange={changeState} value={state.phoneNumber} id="phoneNumber"  placeholder={intl.formatMessage({ id: "phone" })} />
                <Select
                    className="mt-2"
                    styles={MenuStyle}
                    value={selectedOption}
                     defaultValue={{ label: "mesajınızın konusunu seçiniz", value: 0 }}
                    onChange={handleChange}
                    options={options}
                />
                <textarea className="react-tel-input mt-2 form-control" onChange={changeState} value={state.message} id="message" placeholder={intl.formatMessage({ id: "message" })} />
                <div className="d-flex align-items-center justify-content-end">
                    <button onClick={sendEmail} className="footer-button">{translate('Send')}</button>
                </div>
            </form>
        </div>
    );
}
export default injectIntl(ContactForm);