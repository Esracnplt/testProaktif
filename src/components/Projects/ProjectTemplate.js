/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { faAutoprefixer } from "@fortawesome/free-brands-svg-icons";
import React, { useCallback, useRef } from "react";
import data from "../../language.json";
import { MyEventBus, getDefaultLang } from "../Header"
import img from '../../img/office.jpg'

function Proje({ item, index, projectCount }) {
  function InnerProjects({ object, numberVisible }) {
    if (object.innerProjects) {
      var mappedProjects = object.innerProjects.map((object, projectindex) => {
        var imgSize = object.imgSize || 400
        var controledDim = object.controledDim || "width"
        if (object.img) {
          function ColorSet({ object }) {
            if (object.imgColorSet) {
              return (
                object.imgColorSet.map((item, index) => {
                  return (
                    <div key={index} className="color-parent-cont">
                      <div style={{ backgroundColor: item.hex }} className="color-box color"></div>
                      <div className="color-child-cont">
                        <div className="color">
                          {"HEX: " + item.hex}
                        </div>
                        <div className="color">
                          {"RGB: " + item.rgb}
                        </div>
                        <div className="color">
                          {"CMYK: " + item.cmyk}
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            }
            else {
              return false
            }
          }
          var imgs = object.img.map((src, index) => {
            return (
              <div key={index} style={{display:"flex","alignItems":"center"}}>
                <div className="project-img" key={index}>
                  {
                    // height ile oran korunuyor
                  }
                  <img alt="Custom Alt" src={require(`./../../img/${src}`)}
                    id={"img" + index.toString()}
                    className="project-image"
                    style={{ 
                      width: ((controledDim === "width") ? imgSize : "auto"), marginLeft: "30px", height: ((controledDim === "height") ? imgSize : "auto")
                     }} 
                    />
                </div>
                <div className="colors">
                  <ColorSet object={object} />
                </div>
              </div>
            );
          });
        } else {
          imgs = false;
        }
        if (object.parag) {
          var paragraphs = object.parag.map((paragObject, index) => {
            //console.log(paragObject)
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

    function GetBoldVersion(text) {
      if (text.bold.length) {
        innerComponent = text.bold.map((bold, index) => {
          var newStr;
          var BoldText = bold
          if (text.startWithBold) {
            newStr = <div style={{ display: "flex" }}> <div className="bold-text">{BoldText}</div> <div style={{ marginLeft: "5px" }}>{text.def[index]}</div> </div>
          }
          else if (!bold) {
            newStr = text.def[index]
          }
          else {
            newStr = <div style={{ display: "flex" }}> <div className="bold-text"> {text.def[index]} </div> <div style={{ marginLeft: "5px" }}>{BoldText}</div> </div>
          }
          return <React.Fragment key={index}>
            {newStr}
          </React.Fragment>
        })
      }
      else {
        innerComponent = text.def
      }
      return innerComponent
    }

    if (object[name]) {
      if (object[name].steps) {
        function StepNumber({ stepIndex, object }) {
          if (object.numberVisible) {
            return (
              <div className="step-index">
                {(stepIndex + 1) + "."}
              </div>
            )
          }
          else {
            return false
          }
        }
        var steps = object[name].steps.map((step, stepIndex) => {
          return (
            <div key={stepIndex} className="step">
              <StepNumber stepIndex={stepIndex} object={object[name]} />
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
        
        innerComponent = GetBoldVersion(text)
      }
      return <div className="arge-project-desc">
        {innerComponent}
      </div>
    }
    else if (typeof object == "string") {
      text = charIndexFinder(object, "*")
      innerComponent = GetBoldVersion(text)
      //console.log()
      return (
        <div className="arge-project-desc">
          {innerComponent}
        </div>
      )
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
          marginLeft: ((extraMargin) ? extraMargin : 0).toString() + "px",
          marginRight:((extraMarginR)? extraMarginR : 0).toString() + "px"
        }}
        key={(index)?index:"none"}>
        <img
          alt="How it works"
          src={require(`./../../img/${src}`)}
          className="project-image"
          style={{
            width: (width) ? width : "inherit",
            height:(height)?height:"inherit"
          }}
        />
      </div>
    )
  }
  function PImage({ object, isColumn }) {
    if (typeof object.image == "string") {
      var imageSrc = (object.image) ? object.image : object
        return (
          <div className="pimage" style={{ display: "flex", flexDirection: (!isColumn) ? "row" : "column" }}>
            <Image extraMargin={8} height="100px" width="200px" src={imageSrc} />
          </div>
        )
    }
    else if (typeof object.image == "object") {
      let mappedImage = object.image.map((src, index) => <Image extraMargin={8} key={index} index={index} height="100px" width="200px" src={src} />)
      return (
        <div className="pimage" style={{ display: "flex", flexDirection: (!isColumn) ? "row" : "column" }}>
          {mappedImage}
        </div>
      )
    }
    else return false
  }
  var mappedDesc = item.desc.map((object, index) => {
    function ImgPara({ name }) {
      if (typeof object[name] == "string") {
        return <P object={object} name={name} />
      }
      else if (typeof object[name] == "object") {
        function PImageStatement({ object }) {
          if (object.image) {
            return <PImage isColumn={(object.isColumn) ? object.isColumn:false} object={object} />
          }
          else {
            return false
          }
        }
        return (
          <div style={{display:"flex",flexDirection:object.isColumn}}>
            <PImageStatement object={object[name]} />
            <P name={name} object={object[name].text} />
          </div>
        )
      }
      else {
        return false
      }
    }
    return (
      <div key={index} className="arge-project-desc-cont">
        <ImgPara name="p1" />
        <ImgPara name="p2" />
        <InnerProjects numberVisible={"false"} object={object} />
        <PImage isColumn={false} object={object} />
      </div>
    )
  } );
  if (item.img) {
    var imgs = item.img.map((src, index) => {
      return (
        <Image key={index} extraMargin={30} width="500px" index={index} src={src} />
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

function fixedImage(src) {
  //console.log("src",src)
  if (!src) {
    return false
  }
  return (
    <img width="600" src={require("../../img/"+src)} />
  )
}

class ArgeProjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      language:getDefaultLang(),
      projectName:props.projectName
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
    //console.log(data,"data json",data[this.state.language],"project name",this.state.projectName);
    var projects = data[this.state.language].projects[this.state.projectName].map((object, index) => (
      <div key={index} className="project-cont">
        <Proje key={index} index={index} projectCount={data[this.state.language].projects[this.state.projectName].length} item={object} />
      </div>
    ));
    //console.log(data[this.state.language].projects[this.state.projectName])
    return(<div className="row" style={{backgroundColor:"#1d1d1d"}}>
     <div className="arge-projects col-lg-6">
       {projects}
       </div>
       <div className="arge-projects col-lg-6">
         {fixedImage(data[this.state.language].fixedImages[this.state.projectName])}
     </div>
    </div>);
  }
}

class ProjectTemplate extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ArgeProjects projectName={this.props.projectName} />
      </React.Fragment>
    );
  }
}

export default ProjectTemplate;
