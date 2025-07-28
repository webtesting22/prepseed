import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavigationTransition = ({ to, children, className, ...props }) => {
    const location = useLocation();
    
    const handleClick = () => {
        // Add a small delay to show the transition
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <Link 
                to={to} 
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Link>
        </motion.div>
    );
};

export default NavigationTransition; 