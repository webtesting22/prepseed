import React, { useEffect } from "react";
import "./HeroHome.css";
import { Row, Col } from "antd"
import HeroBackLines from "/Images/HeroBackLines.svg"
import HeroHomePortalImage from "/Images/HeroHomePortalImage.webp"
import { Link } from "react-router-dom";
const HeroHome = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="MainContainer">
                <div className="Container marginTop50">
                    <div className="heroHomeContainer">
                        <Row>
                            <Col lg={12}>
                                <div className="heroHomeText paddingRight">
                                    <img src={HeroBackLines} alt="" className="heroBackLines" />
                                    <div className="FlexRowTag marginBottom20">
                                        <span>Powerful AI platform</span>
                                        <span>Prepseed 2.0</span>
                                    </div>
                                    <h1>AI-First, White-Labeled Software for Smarter Workflows</h1>
                                    <p>Empowering enterprises with <span className="color">smart</span>, scalable solutions that eliminate busywork and <span className="color">boost efficiency</span>.</p>
                                    <div className="marginTop20">
                                       <Link to="/about"> <button className="all-industries-btn">Get Started</button></Link>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="heroHomeImage">
                                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/PrepseedUpatedBanner.png" alt="" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroHome;