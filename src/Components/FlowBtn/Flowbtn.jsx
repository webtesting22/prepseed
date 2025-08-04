import React from "react";
import "./Flowbtn.css";
import { FaWhatsapp } from "react-icons/fa";

const Flowbtn = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = "+919913382221";
        const message = "Hi! I need help with customizing my software solution.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="flow-buttons-container">
            {/* WhatsApp Button */}
            <div className="flow-button whatsapp-btn" onClick={handleWhatsAppClick}>
                <div className="button-icon">
                   <FaWhatsapp/>
                </div>
                {/* <span className="button-text">Chat</span> */}
            </div>
        </div>
    );
};
export default Flowbtn;