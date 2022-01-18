import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

export const Example = ({ number }) => {
    console.log(number);
    return <ProgressBar completed={number > 100 ? 100 : number} borderRadius="0px" transitionDuration={"0.5s"} maxCompleted={100} bgColor={number > 50 ? "#4ee111" : "#f34e4e"} />;
};
