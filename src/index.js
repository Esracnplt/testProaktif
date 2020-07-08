import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import ArgeProjectComponent from "./components/Projects/ArgeProjects";
import SocialProjectComponent from "./components/Projects/SocialProjects";
import Products from "./components/Projects/Products"
import ContactComponent from "./components/Contact";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import Kurumsal from "./components/Projects/Kurumsal"
import Collabrations from "./components/Projects/Collabrations";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/contact">
        <ContactComponent />
      </Route>
      <Route path="/argeprojects">
        <ArgeProjectComponent />
      </Route>
      <Route path="/socialprojects">
        <SocialProjectComponent />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/corporate">
        <Kurumsal />
      </Route>
      <Route path="/collabrations">
        <Collabrations />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
