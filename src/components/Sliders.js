/* eslint-disable no-unused-vars */
import React from "react";
import slider1img from "../img/slider1.jpeg";
import slider2img from "../img/slider2.jpg";
import slider3img from "../img/slider3.jpg";

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

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: true };
  }
  componentDidMount() {
    var slider = this;
    MyEventBus.on("currentslide", function (mesaj) {
      if (mesaj === 1) {
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
    if (this.state.render) {
      return (
        <React.Fragment>
          <img
            src={slider1img}
            style={{ width: "100%" }}
            alt="slider"
            className="blur slider-img"
          ></img>
        </React.Fragment>
      );
    } else {
      return true;
    }
  }
}

class Slider2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
  }
  componentDidMount() {
    var slider = this;
    MyEventBus.on("currentslide", function (mesaj) {
      if (mesaj === 2) {
        slider.setState({ render: true });
      } else {
        slider.setState({ render: false });
      }
    });
  }
  render() {
    if (this.state.render) {
      return (
        <React.Fragment>
          <img
            src={slider2img}
            style={{ width: "100%" }}
            alt="slider"
            className="blur slider-img"
          ></img>
        </React.Fragment>
      );
    } else {
      return false;
    }
  }
}

class Slider3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
  }
  componentDidMount() {
    var slider = this;
    MyEventBus.on("currentslide", function (mesaj) {
      if (mesaj === 3) {
        slider.setState({ render: true });
      } else {
        slider.setState({ render: false });
      }
    });
  }
  render() {
    if (this.state.render) {
      return (
        <React.Fragment>
          <img
            src={slider3img}
            style={{ width: "100%" }}
            alt="slider"
            className="blur slider-img"
          ></img>
        </React.Fragment>
      );
    } else {
      return false;
    }
  }
}

class Slider4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
  }
  componentDidMount() {
    var slider = this;
    MyEventBus.on("currentslide", function (mesaj) {
      if (mesaj === 4) {
        slider.setState({ render: true });
      } else {
        slider.setState({ render: false });
      }
    });
  }
  render() {
    if (this.state.render) {
      return (
        <React.Fragment>
          <img
            src={require("./../img/slider4.jpg")}
            style={{ width: "100%" }}
            alt="slider"
            className="blur slider-img"
          ></img>
        </React.Fragment>
      );
    } else {
      return false;
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
        {this.props.side === "left" ? "<" : ">"}
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
        <Slider></Slider>
        <Slider2></Slider2>
        <Slider3></Slider3>
        <Slider4></Slider4>
      </div>
    );
  }
}

export default Sliders;
