import React from "react";
import "./BestExperience.css";
import { Row, Col } from "antd";
import BestExperienceCardData from "./BestExperienceCardData";

const BestExperience = () => {
    return (
        <>
            <div className="MainContainer BestExperienceHomePage paddingTop50 paddingBottom50">
                <div className="Container">
                    <div className="FlexColumn">
                        <div className="flex-column-widthGap maxWidth600">
                            <h2 className="textCenter">Feel The Best Experience
                                With Our <span>Features</span></h2>
                            <p className="paraWeight textCenter">
                                Manage money, reach goals. Simple tools, expert guidance.</p>
                        </div>
                    </div>
                    <div className="BestExperienceHomePageCards marginTop50">
                        <Row gutter={[16, 16]}>
                            {BestExperienceCardData.map((item) => (
                                <Col lg={12} md={12} sm={24} xs={24}>
                                    <div className="BestExperienceCard">
                                        <div className="flex-column-widthGap">
                                            <div className="BestExperienceCardIcon">
                                                <div>
                                                <img src={item.icons} alt="" />
                                                </div>
                                            </div>
                                            <div className="paddingRight">
                                                <h3 >{item.title}</h3>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                    </div>
                </div>
            </div>
        </>
    );
};

export default BestExperience;