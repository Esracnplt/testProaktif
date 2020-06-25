/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sequences */
import React from "react"
import "../../style.css"

let slideIndex = 0

class DynamicSlider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {slideTo:"left","render":(slideIndex===0?true:false)}
    }
    componentDidMount() {
        let slider = this
        /*setInterval(function(){
            slider.setState({
                slideTo:(slider.state.slideTo === "left")?"right":"left",
            })
        },1000)*/
    }
    shouldComponentUpdate() {
        console.log("yes, should update")
        return true
    }
    render() {
        if (this.state.render === true) {
            return(
                <div id="dontbecloser" className="purple ust h60 space-on-media">
                    <div style={{textAlign:"center"}}>
                        <div className={((this.state.slideTo === "left")?"slideLeft":"slideRight") + " white f-700 header"} >
                            dontbecloser
                        </div>
                        <div className={((this.state.slideTo === "left")?"slideLeft":"slideRight") + " white f-700"}>
                            Açıklama Bulamadım
                        </div>
                        <div className="link-cont" style={{transform:"scale(0.7)"},{marginTop:"10px"}}>
                            <a href="/#"><img className="link-to-app" src="/img/googleplay.png" style={{transform:"scale(1.5)"}} alt=""/></a>
                            <a href="/#"><img className="link-to-app" src="/img/appstore.png" alt=""/></a>
                        </div>
            
                        <button type="button" className="down1 down" id="down1" onMouseDown={this.scroll}>
                            <i className="j-self material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
        
                    <img src="/img/phones.png" className="right phones" alt=""/>
                </div>
            )
        }else {return false}
    }
    scroll() {
        window.scrollTo(0,+500)
    }
}
class ImageSlider extends React.Component {
    render() {
        return (
            <div className="a-center j-center">
                <img src="/img/sliding/2.jpg" className="z-minus" />
                <div className={((this.props.slideTo === "left") ? "slideLeft" : "slideRight") + " absolute header f-700"} >3</div>
           </div>
        )
    }
}

export {DynamicSlider,ImageSlider}