import React from "react";
import DynamicContextState from "../CommonContext/DynamicContextState";
import ProcessViewContainer from "./ProcessViewContainer/ProcessViewContainer";

const WrapIndex = () => {
    return (
        <div>
            <DynamicContextState>
                <ProcessViewContainer />
            </DynamicContextState>
        </div>
    );
};

export default WrapIndex;