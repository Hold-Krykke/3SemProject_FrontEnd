import React from "react";


const About = () => {
    return (
        <>
            <div>
                <div className='card'>
                    <p>A.P. Computer Science 3. semester exam project, created by Hold Krykke:</p>
                    <a href="github.com/Runi-VN">rn118 - Rúni Vedel Niclassen</a>
                    <a href="github.com/MalteMagnussen">mh748 - Malte Hviid-Magnussen</a>
                    <a href="github.com/HrBjarup">ab363 - Asger Koch Bjarup</a>
                    <a href="github.com/Castau">cs340 - Camilla Jenny Valerius Staunstrup</a>
                </div>
                <div className='card'>
                    <p>Special thanks to:</p>
                    <a href="http://restcountries.eu/">REST Countries</a>
                    <a href="http://www.geonames.org/">GeoNames</a>
                    <a href="https://developer.ticketmaster.com/">Ticketmaster API</a>
                    <a href="https://simplemaps.com/resources/svg-europe">SimpleMaps</a>
                    <a href="https://ajuhlhansen.dk/WeatherCloud/api/weather ">Hold Chokobananen API</a>
                </div>
            </div>
        </>
    );
};

export default About;