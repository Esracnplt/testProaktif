/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Header";
import data from "../../language.json";
import { MyEventBus, getDefaultLang } from "../Header"

function Proje({ item, index, projectCount }) {
  function InnerProjects({ object, index, numberVisible }) {
    if (object.innerProjects) {
      var mappedProjects = object.innerProjects.map((object, projectindex) => {
        if (object.img) {
          var imgs = object.img.map((src, index) => {
            return (
              <div
                className="project-img"
                key={index}>
                <img
                  alt="How it works"
                  src={require(`./../../img/${src}`)}
                  style={{
                    width:"100px"
                  }}
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
                <PImage isColumn={false} object={paragObject} />
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
              {((numberVisible === "true") ? (projectindex + 1) + ".":"") + object.title}
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
  function Image({ src, index, extraMargin,width, extraMarginR, height }) {
    return (
      <div
        className="project-img"
        style={{
          marginLeft: ((extraMargin) ? extraMargin * 10 : 0) + "px",
          marginRight:((extraMarginR)? extraMarginR : 0) + "px"
        }}
        key={index}>
        <img
          alt="How it works"
          src={require(`./../../img/${src}`)}
          style={{
            width: (width) ? width : "inherit",
            height:(height)?height:"inherit"
          }}
        />
      </div>
    )
  }
  function PImage({ object, isColumn }) {
    if (object.image) {
      let mappedImage = object.image.map((src, index) => <Image extraMarginR={10} key={index}  index={index} height="100px" width="200px" src={src} />)
      return (
        <div style={{display:"flex",flexDirection:(!isColumn)?"row":"column"}}>
          {mappedImage}
        </div>
      )
    }
    else {
      return false
    }
  }
  var mappedDesc = item.desc.map((object, index) => {
    return (
      <div key={index} className="arge-project-desc-cont">
        <P object={object} name="p1" />
        <P object={object} name="p2" />
        <InnerProjects numberVisible={"false"} object={object} />
        <PImage isColumn={false} object={object} />
      </div>
    )
  } );
  if (item.img) {
    var imgs = item.img.map((src, index) => {
      return (
        <Image extraMargin={2} width="500px" index={index} src={src} />
      );
    });
  } else {
    imgs = false;
  }
  return (
    <React.Fragment>
      <div className="arge-project-title">{((projectCount !== 1) ? index + 1 + ".  ":"") + item.title}</div>
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

    //ingilizce dil çevirisi hazır olunca commentler kaldırılabilir.

    /*MyEventBus.on("language", (lang) => {
      this.setState({
        language:lang
      })
    })*/
  }
  render() {
    var projects = data[this.state.language].projects[this.props.projectName].map((object, index) => (
      <div key={index} className="project-cont">
        <Proje key={index} index={index} projectCount={data[this.state.language].projects[this.props.projectName].length} item={object} />
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
