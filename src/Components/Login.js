/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import "../style.css"
import {HashRouter,Link} from "react-router-dom"

class Login extends React.Component {
    render() {
        return(
            <div className="giris-cont">
                <div className="input-cont">
                    <div className="input-items">
                        E-Posta
                        <input type="text" name="email" className="username" id="username" />
                    </div>
                    <div className="input-items">
                        Şifre
                        <input type="text" name="password" className="password" id="password"/>
                    </div>
                    <div className="text align-right"><a>Şifremi Unuttum</a></div>
                    <HashRouter>
                        <Link to="/dashboard" style={{width:"min-content"}}>
                            <button className="reverse margin-top align-right" id="login">Giriş Yap</button>
                        </Link>
                    </HashRouter>
                </div>
                <div className="register-red">
                    hesabınız yok mu?
                    <HashRouter>
                        <Link to="/register"> <div className="f-700">kayıt olun</div> </Link>
                    </HashRouter>
                </div>

            </div>
        )
    }
}

export {Login}