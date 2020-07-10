/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Header";
import data from "../../language.json";
import { MyEventBus, getDefaultLang } from "../Header"

function Proje({ item, index, projectCount }) {
  function InnerProjects({ object, numberVisible }) {
    if (object.innerProjects) {
      var mappedProjects = object.innerProjects.map((object, projectindex) => {
        var imgSize = object.imgSize || 400
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
                    width: imgSize,
                    marginLeft:"30px"
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

    function charIndexFinder(str, char) {
      var firstArray = str.split(char)
      var withoutLast = (firstArray[firstArray.length] !== "") ? firstArray : firstArray.slice(0, firstArray.length - 1)
      var doubles = withoutLast.filter(((object, index) => {
        if (index % 2 === 1) {
          return object
        }
      }))
      var other = withoutLast.filter(((object, index) => {
        if (index % 2 === 0) {
          return object
        }
      }))
      return {
        bold: doubles,
        def: other,
        startWithBold: (str[0] === "*")
      }
    }


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
        var text = charIndexFinder(object[name], "*")
        
        if (text.bold.length) {
          innerComponent = text.bold.map((bold, index) => {
            var newStr;
            var BoldText = bold
            if (text.startWithBold) {
              newStr = <div style={{ display: "flex" }}> <div className="bold-text">{BoldText}</div> <div style={{marginLeft:"5px"}}>{text.def[index]}</div> </div>
            }
            else if (!bold) {
              newStr = text.def[index]
            }
            else {
              newStr = <div style={{ display: "flex" }}> <div className="bold-text"> {text.def[index]} </div> <div style={{ marginLeft: "5px" }}>{BoldText}</div> </div>
              console.log(text.def[index])
            }
            return <React.Fragment key={index}>
              {newStr}
            </React.Fragment>
          })
        }
        else {
          innerComponent = object[name]
        }
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
        <Image key={index} extraMargin={2} width="500px" index={index} src={src} />
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
