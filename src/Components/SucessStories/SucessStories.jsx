import React from "react";
import "./SucessStories.css";
import { Row, Col } from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import SucessStoriesData from "./SucessStoriesData";
const SucessStories = () => {
    return (
        <>
            <div className="MainContainer SucessStories paddingTop50 paddingBottom50">
                <div className="Container">
                    <div className="FlexColumn">
                        <div className="flex-column-widthGap maxWidth600">
                            <h2 className="textCenter">Real Success <span>Stories</span>, Real Impact</h2>
                            <p className="paraWeight textCenter">Discover how our students and partner institutions are achieving remarkable results.</p>
                        </div>
                        <div className="marginTop50 maxWidth600 paddingTop50">
                            <div>
                                <Row>
                                    {/* <Col lg={6}>
                                    </Col> */}
                                    <Col lg={24}>
                                        <div>
                                            <Swiper
                                                slidesPerView={1}
                                                spaceBetween={30}
                                                freeMode={true}
                                                speed={800}
                                                // pagination={{
                                                //     clickable: true,
                                                // }}
                                                autoplay={{
                                                    delay: 2500,
                                                    disableOnInteraction: false,
                                                }}
                                                modules={[FreeMode, Pagination, Autoplay]}
                                                className="mySwiper"
                                            >
                                                {SucessStoriesData.map((item) => (
                                                    <SwiperSlide>
                                                        <div className="SucessStoriesCard flex-column-widthGap">
                                                            {/* <h3>{item.title}</h3> */}
                                                            <div>
                                                                <h4 style={{color:"rgb(62 62 62)",textAlign:"center"}}>"{item.description}"</h4>
                                                            </div>
                                                            <br />
                                                            <div>
                                                                <h4 className="textCenter">{item.title}</h4>
                                                                <p className="paraWeight textCenter" style={{ marginTop: "0px",textAlign:"center" }}>{item.postition}</p>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SucessStories;