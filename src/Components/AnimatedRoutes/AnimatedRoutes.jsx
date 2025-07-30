import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../PageTransition/PageTransition';
import HomePageRoutes from '../HomePage/HomePageRoutes';
import AboutUs from '../AboutUs/AboutUs';
import AllClients from '../OthersComponents/Clients/AllClients/AllClients';
import AllModules from '../OthersComponents/Modules/AllModules/AllModules';
import IndusriesWiseModules from '../OthersComponents/Modules/IndusriesWiseModules/IndusriesWiseModules';
import SingleModule from '../OthersComponents/Modules/SingleModule/SingleModule';
import Policies from '../OthersComponents/Policies/Policies';
import NotFound from '../NotFound/NotFound';
import CreateOwnPortal from '../CreateOwnPortal/CreateOwnPortal';
import ResetPassword from '../ResetPassword/ResetPassword';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route 
                    path="/" 
                    element={
                        <PageTransition>
                            <HomePageRoutes />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/about" 
                    element={
                        <PageTransition>
                            <AboutUs />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/our-clients" 
                    element={
                        <PageTransition>
                            <AllClients />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/modules" 
                    element={
                        <PageTransition>
                            <AllModules />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/services" 
                    element={
                        <PageTransition>
                            <AllModules />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/industry/:industryName" 
                    element={
                        <PageTransition>
                            <IndusriesWiseModules />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/module/:moduleId" 
                    element={
                        <PageTransition>
                            <SingleModule />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/policies/:policyType" 
                    element={
                        <PageTransition>
                            <Policies />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/create-own-portal" 
                    element={
                        <PageTransition>
                            <CreateOwnPortal />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/reset" 
                    element={
                        <PageTransition>
                            <ResetPassword />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="*" 
                    element={
                        <PageTransition>
                            <NotFound />
                        </PageTransition>
                    }   
                />

            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes; 