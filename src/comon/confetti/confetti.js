import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
// import "./styles.css";

export default function ConfettiReact() {
    const sgColors = [
        "#9ce8c2",
        "#60d399",
        "#b9e2fe",
        "#4fb3f6",
        "#bdc7fb",
        "#6d83f3",
        "#ff7968",
        "#ffe8e5",
        "#fedd8e",
        "#fbbe2e"
    ];
    return (
        <div className="w-100" >

            <Confetti
                className="canvas w-100 h-100"
                colors={sgColors}
                numberOfPieces={600}
                gravity={0.1}
                recycle={false}
                onConfettiComplete={(confetti) => {

                    confetti.reset();
                }}
            />


        </div>
    );
}


