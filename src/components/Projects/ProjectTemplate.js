import React from "react";
import Header from "../Header";
import data from "../../language.json";
import { MyEventBus, getDefaultLang } from "../Header"

function Proje({ item, index }) {
  function P({ object, name }) {
    if (object[name]) {
      if (object[name].steps) {
        var steps = object[name].steps.map((step,stepIndex) => {
          return (
            <div key={stepIndex} className="step">
              <div className="step-index">
                {(stepIndex+1) + "." }
              </div>
              {step}
            </div>
          )
        })
        var innerComponent = <div>
          <div className="step-text">
            {object[name].text}
          </div>
          <div className="steps">
            {steps}
          </div>
        </div>
      }
      else {
        innerComponent = object[name]
      }
      return <div className="arge-project-desc">
        {innerComponent}
      </div>
    }
    else {
      return false
    }
  }
  var mappedDesc = item.desc.map((object, index) => (
    <div key={index} className="arge-project-desc-cont">
      <P object={object} name="p1" />
      <P object={object} name="p2" />
    </div>
  ));
  if (item.img) {
    var imgs = item.img.map((src, index) => {
      return (
        <div className="project-img" key={index}>
          <img
            alt="How it works"
            src={require(`./../../img/${src}`)}
            style={{width:"100%"}}
          />
        </div>
      );
    });
  } else {
    imgs = false;
  }
  return (
    <React.Fragment>
      <div className="arge-project-title">{index + 1 + ".  " + item.title}</div>
      {mappedDesc}
      {imgs}
    </React.Fragment>
  );
}

class ArgeProjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      language:getDefaultLang()
    })
  }
  componentDidMount() {
    MyEventBus.on("language", (lang) => {
      this.setState({
        language:lang
      })
    })
  }
  render() {
    var projects = data[this.state.language].projects[this.props.projectName].map((object, index) => (
      <div key={index} className="project-cont">
        <Proje key={index} index={index} item={object} />
      </div>
    ));
    return <div className="arge-projects">{projects}</div>;
  }
}

class ProjectTemplate extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <ArgeProjects projectName={this.props.projectName} />
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectTemplate;
