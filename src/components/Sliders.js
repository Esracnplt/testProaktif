/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import data from "../language.json"

import EventBus from "js-event-bus";

const MyEventBus = new EventBus();

var sliderCount = 4;
var intervalHizi = 10000;

var index = 1;
function arttır(e) {
  if (e) {
    clearInterval(interval);
    interval = setInterval(arttır, intervalHizi);
  }
  index = index === sliderCount ? 1 : index + 1;
  MyEventBus.emit("currentslide", null, index);
}
function eksilt(e) {
  if (e) {
    clearInterval(interval);
    interval = setInterval(arttır, intervalHizi);
  }
  index = index === 1 ? sliderCount : index - 1;
  MyEventBus.emit("currentslide", null, index);
}
let interval = setInterval(arttır, intervalHizi);



class DefaultSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: (this.props.whichSlider === 1) ? true : false, whichSlider: this.props.whichSlider, innerWidth: window.innerWidth
    };
  }
  componentDidMount() {
    var slider = this;
    window.onresize = function (e) {
      slider.setState({innerWidth:window.innerWidth})
    }
    MyEventBus.on("currentslide", function (mesaj) {
      if (mesaj === slider.state.whichSlider) {
        slider.setState({ render: true });
      } else {
        slider.setState({ render: false });
      }
    });
  }
  componentWillUnmount() {
    MyEventBus.detachAll();
  }
  render() {
    var languageObject = data.tr.home.sliders[this.props.sliderName]
    if (this.state.render) {
      return (
        <div style={{ width: "100%",backgroundSize:"100%",backgroundRepeat:"no-repeat","height":((this.state.innerWidth/1920)*500).toString() + "px", position: "relative", backgroundImage:`url(${require('./../img/'+languageObject.imgname)})`}} className="center" id={"slider"+this.state.whichSlider}>
          {/* <img
            src={require("./../img/" + languageObject.imgname)}
            style={{ width: "100%" }}
            alt="slider"
            className="blur slider-img"
          ></img> */}
          <Link className="slider-text-cont" to={languageObject.to}>
            <div className="slider-text">
              {languageObject.text}
            </div>
          </Link>
        </div>
      );
    } else {
      return true;
    }
  }
}

class ButtonArrow extends React.Component {
  componentDidMount() {
    let button = this;
    document.getElementsByClassName(
      "arrow-" + this.props.side
    )[0].onmousedown = function () {
      if (button.props.side === "left") {
        eksilt("a");
      } else {
        arttır("a");
      }
    };
  }
  render() {
    return (
      <div
        className={
          (this.props.side === "left" ? "arrow-left" : "arrow-right") +
          " arrow-button center"
        }
      >
        {this.props.side === "left" ? (
          <FontAwesomeIcon icon={faArrowLeft} />
        ) : (
          <FontAwesomeIcon icon={faArrowRight} />
        )}
      </div>
    );
  }
}

class Sliders extends React.Component {
  render() {
    return (
      <div className="slider-cont">
        <ButtonArrow side="left"></ButtonArrow>
        <ButtonArrow side="right"></ButtonArrow>


        <DefaultSlider whichSlider={1} sliderName="slider1" />
        <DefaultSlider whichSlider={2} sliderName="slider2" />
        <DefaultSlider whichSlider={3} sliderName="slider3" />
        <DefaultSlider whichSlider={4} sliderName="slider4" />


      </div>
    );
  }
}

export default Sliders;
