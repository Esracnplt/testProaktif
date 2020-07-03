import React from "react";
import Header from "../Header";
import data from "../../language.json";

function Proje({ item, index }) {
  var mappedDesc = item.desc.map((object, index) => (
    <div key={index} className="arge-project-desc-cont">
      <div className="arge-project-desc">{object.p1}</div>
      <div className="arge-project-desc">{object.p2}</div>
    </div>
  ));
  return (
    <React.Fragment>
      <div className="arge-project-title">{index + 1 + ".  " + item.title}</div>
      {mappedDesc}
    </React.Fragment>
  );
}

class ArgeProjects extends React.Component {
  render() {
    var projects = data.tr.projects.argeProjects.map((object, index) => (
      <div key={index} className="project-cont">
        <Proje index={index} item={object} />
      </div>
    ));
    return <div className="arge-projects">{projects}</div>;
  }
}

class ArgeProjectComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <ArgeProjects />
        </div>
      </React.Fragment>
    );
  }
}

export default ArgeProjectComponent;
