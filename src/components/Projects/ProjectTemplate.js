/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Header";
import data from "../../language.json";
import { MyEventBus, getDefaultLang } from "../Header"

function Proje({ item, index }) {
  function InnerProjects({ object, index }) {
    if (object.innerProjects) {
      var mappedProjects = object.innerProjects.map((object, projectindex) => {
        if (object.img) {
          var imgs = object.img.map((src, index) => {
            return (
              <div className="inner-project-img project-img" key={index}>
                <img
                  alt="How it works"
                  src={require(`./../../img/${src}`)}
                  style={{ width: "100%" }}
                />
              </div>
            );
          });
        } else {
          imgs = false;
        }
        if (object.parag) {
          var paragraphs = object.parag.map((paragObject,index) => {
            return (
              <div key={index}>
                <P extraMargin="2" withoutText={true} object={paragObject} name="p1" />
                <P extraMargin="2" withoutText={true} object={paragObject} name="p2" />
              </div>
            )
          })
        }
        else {
          paragraphs = ""
        }
        return (
           <div key={projectindex} className="inner-project-cont">
            <div className="inner-project-title">
              {(projectindex+1) + "." + object.title}
            </div>
            <div>
              {paragraphs}
            </div>
            {imgs}
          </div>
        )
      })
      return (
        <div className="inner-projects">
          {mappedProjects}
        </div>
      )
    }
    else {
      return false
    }
  }
  function P({ object, name, extraMargin, withoutText }) {
    if (object[name]) {
      if (object[name].steps) {
        var steps = object[name].steps.map((step, stepIndex) => {
          return (
            <div key={stepIndex} className="step">
              <div className="step-index">
                {(stepIndex+1) + "." }
              </div>
              {step}
            </div>
          )
        })
        var step_text = (!withoutText) ? <div className="step-text">{object[name].text}</div> : ""
        var innerComponent = <div style={{marginLeft:((extraMargin)?extraMargin*10:10).toString() + "px"}}>
          {step_text}
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
      <InnerProjects object={object} />
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
    /*MyEventBus.on("language", (lang) => {
      this.setState({
        language:lang
      })
    })*/
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
