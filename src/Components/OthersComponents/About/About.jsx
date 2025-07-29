import React, { useState, useEffect, useRef } from "react";
import "./About.css";
import { Row, Col } from "antd";
import AchivementData from "./AchivementData";

// Animated Counter Component
const AnimatedCounter = ({ endValue, duration = 2000, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * endValue);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, endValue, duration]);

    // Format number with commas for large numbers
    const formatNumber = (num) => {
        if (typeof num === 'string') {
            // Handle string values like "$1.2M"
            return num;
        }
        return num.toLocaleString();
    };

    return (
        <span ref={counterRef} className="animated-counter">
            {prefix}{formatNumber(count)}{suffix}
        </span>
    );
};


const About = () => {
    return (
        <div className="MainContainer  paddingBottom50">
            <div className="Container">
                <div className="flex-column-widthGap paddingTop maxWidth600">
                    <h2 className="textCenter">Your Trusted Partner in Financial <span>Success</span></h2>
                    <p className="textCenter paraWeight">Built to empower your goals, streamline tasks, and give you full control over your finances, comprehensive tools tailored to meet all your financial needs.</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {/* <button className="all-industries-btn">Get Started</button> */}
                    </div>
                </div>
                <div className="marginTop50 marginBottom50">
                    <div className="AboutUsImageContainer">
                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutUsbanner.jpg" alt="" />
                    </div>
                </div>
                <div className="PrepseedAchivementsBoxes">
                    <Row gutter={[16, 16]}>
                        {AchivementData.map((item, index) => (
                            <Col key={index} lg={6} md={12} sm={24}>
                                <div className="PrepseedAchivementsBoxesItem">
                                    <h3>
                                        {item.title.includes('$') ? (
                                            <AnimatedCounter
                                                endValue={parseFloat(item.title.replace(/[$,]/g, ''))}
                                                prefix="$"
                                                suffix={item.title.includes('M') ? 'M' : ''}
                                                duration={2500}
                                            />
                                        ) : item.title.includes('%') ? (
                                            <AnimatedCounter
                                                endValue={parseInt(item.title)}
                                                suffix="%"
                                                duration={1500}
                                            />
                                        ) : item.title.includes('+') ? (
                                            <AnimatedCounter
                                                endValue={parseInt(item.title.replace(/,/g, ''))}
                                                suffix="+"
                                                duration={3000}
                                            />
                                        ) : (
                                            item.title
                                        )}
                                    </h3>
                                    <p><b>{item.description}</b></p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default About;   