import React from "react";

const Footer = () => {
    // Contains zero styling - pure HTML (react)
    return (
        <>
            {/* COLUMN ONE START */}
            <h4>Hold Krykke</h4>
            <p>[Insert Footer Paragraph here]</p>
            {/* COLUMN TWO START */}
            <ul>
                <li>Click a Country</li>
                <li>Click a City</li>
                <li>Pick a Date</li>
                <li>Result</li>
            </ul>
            {/* COLUMN THREE START */}
            <a href="#/about">About & Credits</a>
            <br />
            [GitHub Logo] <a href="https://www.github.com/Hold-Krykke">Hold Krykke</a>
            <br />
            {/* AT THE BOTTOM BELOW COLUMNS */}
            Copyright 2019. All Rights Reserved.
    </>
    );
};

export default Footer;
