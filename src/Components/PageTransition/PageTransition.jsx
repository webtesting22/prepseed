import React from 'react';
import { motion } from 'framer-motion';
import './PageTransition.css';

const PageTransition = ({ children }) => {
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(10px)"
        },
        in: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
        },
        out: {
            opacity: 0,
            y: -30,
            scale: 0.95,
            filter: "blur(10px)"
        }
    };

    const pageTransition = {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="page-transition"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition; 