import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegIdCard } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";

const WhatsNewModuleData = {
    mainCard: {
        title: "Customizable CRM Software",
        tags: ["Education"],
        description: "Tailored CRM solution designed specifically for educational institutions. Manage students, staff, fees, communications, and administrative tasks with our purpose-built platform that adapts to your unique requirements and workflows.",
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutUsbanner.jpg"
    },
    featureCards: [
        {
            title: "Fees Management",
            tags: ["Management"],
            description: "Streamlined fee collection and management system for students and staff. Track payments, generate invoices, and manage financial records efficiently.",
            icon: <MdOutlineCurrencyRupee />
        },
        {
            title: "WhatsApp Integrations",
            tags: ["Communication"],
            description: "Seamless WhatsApp integration for instant communication with students and staff. Send notifications, updates, and important announcements directly.",
            icon: <FaWhatsapp />
        },
        {
            title: "Leave Application",
            tags: ["HR"],
            description: "Digital leave management system for students and staff. Submit, approve, and track leave applications with automated workflows.",
            icon: <FaRegIdCard />
        },
        {
            title: "Issues and Feedback",
            tags: ["Support"],
            description: "Comprehensive system for managing issues and collecting feedback from students and staff. Track, resolve, and improve based on user input.",
            icon: <VscFeedback />
        }
    ]
};

export default WhatsNewModuleData;







