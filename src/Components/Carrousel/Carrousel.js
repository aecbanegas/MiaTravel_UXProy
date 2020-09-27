import React, { Component } from "react";
import img1 from '../../Images/cancun.jpg';
import img2 from '../../Images/Welcome-to-Roatan.jpg';
import img3 from '../../Images/palmyra-before-the-war.jpg';
import "./Carrousel.css";
import { sampleCarrousel } from "../../Data.js"



//<img src={img1} className="d-block w-100" alt="..." />
class Carrousel extends Component {
    constructor() {
        super();
        this.state = {
            sampledata: sampleCarrousel
        }
        setTimeout(() => {
            this.setState({ sampledata: sampleCarrousel })
            console.log('Me actualice')
        }, 2000)
    }
    render() {
        return (
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox" style={{ height: 750 }}>
                    {this.state.sampledata.map((value, index) => (
                        index==0?(<div className="carousel-item active tam" key={index}>
                            <img src={value.image} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block" style={{ background: "rgba(0, 0, 0, 0.75)"}}>
                                <h5>{value.header}</h5>
                                <p>{value.body}</p>
                            </div>
                        </div>):(<div className="carousel-item tam" key={index}>
                            <img src={value.image} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block" style={{ background: "rgba(0, 0, 0, 0.75)"}}>
                                <h5>{value.header}</h5>
                                <p>{value.body}</p>
                            </div>
                        </div>)
                    ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default Carrousel;



/*
.map((value, index) => (
                        <div className="carousel-item active tam" key={index}>
                            <img src={value.image} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{value.header}</h5>
                                <p>{value.body}</p>
                            </div>
                        </div>
                    ))
<div className="carousel-item active tam">
                        <img src={img1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                    <div className="carousel-item tam">
                        <img src={img2} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="carousel-item tam">
                        <img src={img3} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                    </div>
*/

/*
<div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>*/