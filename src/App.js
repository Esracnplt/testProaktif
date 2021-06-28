import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import index from './components';
import History from './utils/history';
import { I18nProvider } from './i18nProvider';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { currentLocale } from './utils/atomUtils';
import corporate from './components/Corporate';
import Products from './components/Products';
import Projects from './components/Projects';
import Contact from './components/Contact';
import VolunterEdu from './components/VolunterEdu';
import Referance from './components/Referance';


function App() {
  const [currentLanguage, setCurrentLanguage] = useRecoilState(currentLocale);
  const [locale, setLocale] = useState(currentLanguage);
  const [windowSize, setWindowSize] = useState();
  useEffect(() => {
    const Tawk_LoadStart = new Date();
    const script = document.createElement("script");
    script.id = 'tawkId';
    script.async = true;
    script.src = "https://embed.tawk.to/5f4aba311e7ade5df44518a9/default";
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.onload = () => startTawk();
    //For head
    document.head.appendChild(script);
  }, []);
 useEffect(() => {
  document.getElementById("tawkId").remove();
 }, []);

 function startTawk() {
    var Tawk_API = Tawk_API || {};
    Tawk_API.visitor = {
      name: window.location.hostname
    };
  }
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
  useEffect(() => {
    setLocale(currentLanguage);
  }, [currentLanguage]);

  return (
    <I18nProvider locale={locale}>
      <Router history={History}>
        <div className="App">
          <Header />
          <Switch>
              <Route exact path={"/"||"/proaktif"} component={index} />
              <Route path="/Corporate" component={corporate} />
              <Route path="/Products" component={Products} />
              <Route path="/Projects" component={Projects} />    
              <Route path="/Contact" component={Contact} />
              <Route path="/VolunterEdu" component={VolunterEdu} /> 
              <Route path="/Referance" component={Referance} />                                           
           </Switch>
          <Footer />
        </div>
      </Router>
    </I18nProvider>
  );
}

export default App;
