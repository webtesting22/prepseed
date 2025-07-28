import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "What is Prepseed, and how can it benefit my business?",
            answer: "Prepseed specializes in AI-first, white-labeled software solutions that automate menial tasks and streamline workflows. Our platform enhances efficiency by reducing manual effort, improving productivity, and enabling businesses across industries to focus on what truly matters. We tailor our solutions to fit your business needs and optimize operations."
        },
        {
            question: "How does Prepseed's AI technology work to automate tasks?",
            answer: "Prepseed uses cutting-edge AI algorithms to analyze repetitive tasks and automate them, allowing your team to focus on strategic activities. Our technology learns from your workflows to provide intelligent solutions, optimizing processes, reducing errors, and improving decision-making with minimal human intervention."
        },
        {
            question: "Can Prepseed integrate with my existing software and tools?",
            answer: "Yes, Prepseed offers seamless integrations with a wide range of existing software and tools. Whether it’s CRM systems, project management tools, or communication platforms, we ensure our AI-driven solutions work harmoniously with the tools you already use. We prioritize customization to suit your specific workflow needs."
        },
        {
            question: "How secure is the data in Prepseed's platform?",
            answer: "Security is a top priority at Prepseed. Our AI-first solutions are built with enterprise-grade encryption and follow industry best practices to ensure the highest level of data protection. We implement role-based access, regular security audits, and compliance with global standards like GDPR to keep your data safe and secure."
        },
        {
            question: "Do I need technical expertise to implement Prepseed’s solutions?",
            answer: "No technical expertise is required! Prepseed’s solutions are designed to be user-friendly and easily deployable. Our platform offers a simple onboarding process, guided setup, and ongoing support through tutorials and a dedicated customer service team. No matter your team's technical background, you can get started effortlessly."
        }
    ];
    

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="MainContainer paddingTop50 paddingBottom50 FAQContainer">
            <div className="Container">
                <div className="flex-column-widthGap">
                    <h2 className="textCenter">All You <span>Need</span> to Know</h2>
                    <p className="textCenter paraWeight">Quick answers to help you get the most out of your unified workspace</p>
                </div>
                
                <div className="faq-section">
                    <div className="faq-container">
                        {faqData.map((item, index) => (
                            <div key={index} className="faq-item">
                                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                    <div className="question-text">
                                        {item.question.split('**').map((part, i) => 
                                            i % 2 === 0 ? part : <span key={i} className="highlighted-word">{part}</span>
                                        )}
                                    </div>
                                    <button className={`faq-toggle ${activeIndex === index ? 'active' : ''}`}>
                                        <span className="toggle-icon">+</span>
                                    </button>
                                </div>
                                <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                                    <p>{item.answer}</p>
                                </div>
                                {index < faqData.length - 1 && <div className="faq-divider"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;