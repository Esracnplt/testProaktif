import React from "react";
import Header from "../Header";
import data from "../../language.json";

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
        <div key={index}>
          <img
            alt="How it works"
            src={require(`./../../img/${src}`)}
            className="project-img"
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
  render() {
    var projects = data.tr.projects[this.props.projectName].map((object, index) => (
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
