import React, { useEffect, useState } from 'react';
import translate from '../i18nProvider/translate';
import LanguageSelect from './layout/languageSelect';
import { faBars, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { navClass } from '../utils/atomUtils';

export default function Header(props) {
    const { history } = props;

    const [windowSize, setWindowSize] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openSubMenu, setopenSubMenu] = useState(false);
     const [navClassN, setNavClassN] = useRecoilState(navClass);

     const location = useLocation();
     const path = location.pathname.split("/");
 
 
     useEffect(() => {
       if (path[1].length === 0) {
           setNavClassN("mainBar mainbar-color");
       } else {
        setNavClassN("navMain");
       }
     }, [navClassN]);

      console.log(navClassN,"navClassN");
    useEffect(() => {
        function updateSize() {
            if (window.innerWidth >= 982) {
                setWindowSize(true)
            }
            else if (window.innerWidth < 982) {
                setWindowSize(false);
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return (
        <header className={"w-100 " + navClassN}>
            <div className="d-flex align-items-center justify-content-between p-2 w-100">
                <div className="d-flex justify-content-start">
                    {windowSize === true ? (
                        <div className="d-flex align-items-center justify-content-center">
                            <img height='60px' width='60px' className="ml-2" style={{opacity:"none"}} src={'/assests/img/logo.png'} />
                            <p style={{ color: "white", marginTop: 10, marginLeft: 2, fontSize: 20, fontWeight: "bold",fontStyle:"italic" }}>Proaktif</p>

                        </div>) : (<div>
                            <a onClick={() => setOpenMenu(!openMenu)}>
                                <FontAwesomeIcon style={{ color: "white" }} icon={faBars} />
                            </a>
                        </div>)}
                </div>

                <div className="d-flex align-items-center justify-self-center">
                    {windowSize === false && (<img height='55px' width='55px' src={'/assests/img/logo.png'} />)}
                </div>
                <div className="d-flex justify-content-end row mr-4">
                    {windowSize === true && (<>
                        <li className="mr-2"><a href="/">{translate('home')}</a></li>
                        <li className="mr-2"><Link to="/Corporate">{translate('corparate')}</Link></li>
                        <li className="mr-2"><Link to="/Products">{translate('product')} </Link></li>
                        <li class="dropdown mr-2">
                            <a class="dropdown-toggle" data-toggle="dropdown" style={{ backgroundColor: "#007bff", color: "white" }} href="#">{translate('projects')}</a>
                            <ul class="dropdown-menu sub-menu" style={{backgroundColor:"rgb(0, 173, 239,0.6)",color: "white",boxShadow:"3px 2px 13px 0px rgba(50, 55, 50, 0.93)" }}>
                                <li><a href="/Projects"> AR-GE Projelerimiz</a></li>
                                <li><a href="/VolunterEdu"> Eğitim geleceğimiz sosyal sorumluluk Projelerimiz</a></li>
                            </ul>
                        </li>
                        <li className="mr-2"><Link to="/Referance">{translate('collaborations')}</Link></li>
                        <li className="mr-3 ml-3 "><Link to="/Contact">{translate('contact')}</Link></li>
                    </>)}

                    <LanguageSelect />
                </div>
            </div>
            <div>
                {openMenu === true && windowSize === false &&
                    <div className="mobile-menu" style={{ zIndex: 1 }}>
                        <ul className="mobile-sub-menu">
                            <li><a href="/">Anasayfa</a></li>
                            <li><Link to="/Corporate">Kurumsal</Link></li>
                            <li><Link to="/Products"> Ürünlerimiz</Link></li>
                            <li><a onClick={() => setopenSubMenu(!openSubMenu)} style={{ cursor: "pointer",backgroundColor:"transparent !important" }}>Projelerimiz</a>
                            {openSubMenu ? <FontAwesomeIcon className="ml-2" icon={faSortDown} /> : <FontAwesomeIcon className="ml-2" icon={faSortUp} />}</li>
                            {openSubMenu &&
                                <ul className="mobile-sub-menu">
                                    <li><a href="/Projects"> AR-GE Projelerimiz</a></li>
                                    <li><a href="/Products"> Eğitim geleceğimiz sosyal sorumluluk Projelerimiz</a></li>
                                </ul>}
                            <li><Link to="/Referance"> İş Birliklerimiz</Link></li>
                            <li><button className="mt-3" className="contact-btn"><Link to="/Contact">İletişim</Link></button></li>
                        </ul>
                    </div>}
            </div>
        </header>
    );
}
