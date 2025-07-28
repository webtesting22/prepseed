import OutdoorMedia from "/Images/OutdoorMedia.svg"
import medicare from "/Images/medicare.svg"
import Education from "/Images/Education.svg"
import Printing from "/Images/printing.svg"

const modulesData = {
    "Outdoor Media": {
        title: "Outdoor Media",
        description: "Innovative outdoor media solutions designed to maximize brand visibility and engagement.",
        image: OutdoorMedia,
        modules: [
            {
                id: "outdoor-1",
                title: "Digital Billboards",
                description: "Advanced digital billboard management system with real-time content updates and audience analytics.",
                features: ["Real-time content updates", "Audience analytics", "Weather integration", "Scheduling system"],
                price: "$2,999",
                duration: "2-3 weeks"
            },
            {
                id: "outdoor-2",
                title: "Transit Advertising",
                description: "Complete transit advertising management platform for buses, trains, and public transport.",
                features: ["Route optimization", "Inventory management", "Revenue tracking", "Client portal"],
                price: "$1,999",
                duration: "1-2 weeks"
            },
            {
                id: "outdoor-3",
                title: "Street Furniture",
                description: "Smart street furniture advertising system with interactive displays and location-based content.",
                features: ["Interactive displays", "Location-based content", "Maintenance alerts", "Performance metrics"],
                price: "$3,499",
                duration: "3-4 weeks"
            }
        ]
    },
    "Medicare": {
        title: "Medicare",
        description: "Advanced software solutions to enhance healthcare service management and patient care.",
        image: medicare,
        modules: [
            {
                id: "medicare-1",
                title: "Patient Management",
                description: "Comprehensive patient management system with electronic health records and appointment scheduling.",
                features: ["Electronic health records", "Appointment scheduling", "Billing integration", "Patient portal"],
                price: "$4,999",
                duration: "4-5 weeks"
            },
            {
                id: "medicare-2",
                title: "Pharmacy Management",
                description: "Complete pharmacy management solution with inventory tracking and prescription management.",
                features: ["Inventory tracking", "Prescription management", "Drug interaction alerts", "Billing system"],
                price: "$3,499",
                duration: "3-4 weeks"
            },
            {
                id: "medicare-3",
                title: "Telemedicine Platform",
                description: "Secure telemedicine platform for remote consultations and virtual healthcare services.",
                features: ["Video consultations", "Secure messaging", "Prescription management", "Payment integration"],
                price: "$5,999",
                duration: "5-6 weeks"
            }
        ]
    },
    "Education Management": {
        title: "Education Management",
        description: "Software solutions to optimize educational institution operations and improve learning outcomes.",
        image: Education,
        modules: [
            {
                id: "education-1",
                title: "Student Information System",
                description: "Complete student information management system with academic tracking and performance analytics.",
                features: ["Student profiles", "Academic tracking", "Performance analytics", "Parent portal"],
                price: "$3,999",
                duration: "3-4 weeks"
            },
            {
                id: "education-2",
                title: "Learning Management System",
                description: "Advanced LMS with course management, online assessments, and progress tracking.",
                features: ["Course management", "Online assessments", "Progress tracking", "Content library"],
                price: "$4,499",
                duration: "4-5 weeks"
            },
            {
                id: "education-3",
                title: "School Administration",
                description: "Comprehensive school administration system for staff management and operational efficiency.",
                features: ["Staff management", "Attendance tracking", "Fee management", "Communication tools"],
                price: "$2,999",
                duration: "2-3 weeks"
            }
        ]
    },
    "Printing Industry": {
        title: "Printing Industry",
        description: "Cutting-edge software solutions for the printing industry to streamline design to production workflow.",
        image: Printing,
        modules: [
            {
                id: "printing-1",
                title: "Print Job Management",
                description: "Complete print job management system with workflow automation and quality control.",
                features: ["Workflow automation", "Quality control", "Job tracking", "Client approval"],
                price: "$2,499",
                duration: "2-3 weeks"
            },
            {
                id: "printing-2",
                title: "Design Studio",
                description: "Advanced design studio with templates, customization tools, and collaboration features.",
                features: ["Template library", "Customization tools", "Collaboration features", "Version control"],
                price: "$3,999",
                duration: "3-4 weeks"
            },
            {
                id: "printing-3",
                title: "Production Planning",
                description: "Smart production planning system with resource optimization and deadline management.",
                features: ["Resource optimization", "Deadline management", "Cost tracking", "Capacity planning"],
                price: "$2,999",
                duration: "2-3 weeks"
            }
        ]
    }
};

export default modulesData; 