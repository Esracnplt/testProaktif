import React, { useState } from 'react';
import { LANGUAGE_OPTIONS, getBrowserLanguage } from '../../i18nProvider/locales';
import 'react-bootstrap';

import { currentLocale, currentLocaleSelector } from '../../utils/atomUtils';
import { useRecoilState, useRecoilValue } from 'recoil';

 const LanguageSelect = ()=> {
    const [currentLanguage, setCurrentLanguage] = useRecoilState(currentLocale);
    const currentLanguageSelector = useRecoilValue(currentLocaleSelector);

    const onLanguageChance = (event) => {
        event.preventDefault();
        console.log(event,"event");
        localStorage.setItem("language", event.target.value);
        setCurrentLanguage(event.target.value);
    }
    return (
        <div>
        <select
            style={{ borderRadius: 3, border: "none",backgroundColor:"transparent", color:"white" ,border:1,height:29, fontSize: 17, fontWeight: 600, fontFamily: "Poppins" }}
            height="20px"
            width="30px"
            data-width="fit"
            className="font-weight-bold"
            onChange={(e) => onLanguageChance(e)}
            value={currentLanguageSelector}
        >            
            {LANGUAGE_OPTIONS.map(o =>
                <option
                    style={{borderRadius:5,border:0,color:"#007bff",backgroundColor:"rgb(0, 173, 239,0.6)"}}
                    className="font-weight-bold"
                    value={o.value}>
                     {o.label}
                </option>
            )}
        </select>
    </div>
    )
}
export default LanguageSelect;