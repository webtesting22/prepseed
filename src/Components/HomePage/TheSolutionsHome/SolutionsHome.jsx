import React from "react";
import "./SolutionsHome.css";
import { Row, Col } from "antd";
import TheSolutionsData from "./TheSolutionsData";
// import TheCenterSolutionsGraphic from "../../../../public/Images/TheSolutionsCenterCircle.svg"
const SolutionsHome = () => {

    return (
        <>
            <div className="MainContainer TheSolutionsHome paddingTop50 paddingBottom50">
                <div className="Container">
                    <Row>
                        <Col lg={12}>
                            <div className="flex-column-widthGap PaddingAdjustRight">
                                <h2>Proven <span>Solutions</span>, Real Impact, Unmatched Growth</h2>
                                <p className="paraWeight">Driving global growth with 250K+ users and $1.2M in trusted investor backing.</p>
                                <div>
                                    <button className="all-industries-btn">
                                        <span>Explore Solutions</span>
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="HierarchyContainer">
                                <div className="HierarchyContainerCenterCircle">
                                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/TheSolutionsCenterCircle.png" alt="TheCenterSolutionsGraphic" />
                                </div>
                                <div className="HierarchyItems">
                                    <Row>
                                        {TheSolutionsData.map((item) => (
                                            <Col lg={12} key={item.id}>
                                                <div key={item.id} className="HierarchyItem">
                                                    <div>
                                                        <h4 className="textCenter">{item.title}</h4>
                                                        {/* <p>{item.description}</p> */}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div >
        </>
    );
};

export default SolutionsHome;