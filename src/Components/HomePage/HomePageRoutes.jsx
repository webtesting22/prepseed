import React from "react";
import HeroHome from "./HeroHome/HeroHome";
import SolutionsHome from "./TheSolutionsHome/SolutionsHome";
import BestExperience from "./BestExperienceHomePage/BestExperience";
import SucessStories from "../SucessStories/SucessStories";
import Industries from "../OthersComponents/Industries/Industries";
import SlidesClients from "../OthersComponents/Clients/CarousalClients/SlidesClients";
const HomePageRoutes = () => {
    return (
        <>
            <HeroHome />
            <SolutionsHome />
            <BestExperience />
            <Industries />
            <div className="BackgroundColor">
                <SlidesClients />
            </div>
            <SucessStories />
        </>
    );
};

export default HomePageRoutes;