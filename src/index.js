import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import ArgeProjectComponent from "./components/Projects/ArgeProjects";
import ContactComponent from "./components/Contact";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";

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
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
