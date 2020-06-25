import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom"
import './index.css';
import * as serviceWorker from './serviceWorker';

import {Header} from "./Components/Header"
import {Login} from "./Components/Login"
import {MainMenu} from "./Components/MainMenu/MainMenu"
import {Dashboard} from "./Components/Dashboard/Dashboard"

ReactDOM.render(
  <React.StrictMode>
    <form spellCheck={false}>
      <HashRouter>
      
        <Route path="/register">
          <Header button_text="Home Screen" text="go and look what we are making" send="/" ></Header>
        </Route>

        <Route path="/dashboard">
          <Dashboard></Dashboard>
        </Route>

        <Route exact path="/" component={()=> <MainMenu></MainMenu> } ></Route>

        <Route path="/login" component={()=> <Login></Login> }/>
        
      </HashRouter>
    </form>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
