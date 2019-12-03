import React from "react";
import { Card, ListGroup, CardGroup, Container, Row } from "react-bootstrap";

const About = () => {
    return (
        <>

            <Container className='mt-5 mb-5'>
                <Row className="justify-content-md-center">
                    <CardGroup className='w-75'>
                        <Card>
                            <Card.Body>
                                <Card.Title>ABOUT</Card.Title>
                                <Card.Text>
                                    A.P. Computer Science 3. semester exam project, created by Hold Krykke
                            </Card.Text>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><a href="github.com/Runi-VN">rn118 - Rúni Vedel Niclassen</a></ListGroup.Item>
                                    <ListGroup.Item><a href="github.com/MalteMagnussen">mh748 - Malte Hviid-Magnussen</a></ListGroup.Item>
                                    <ListGroup.Item><a href="github.com/HrBjarup">ab363 - Asger Koch Bjarup</a></ListGroup.Item>
                                    <ListGroup.Item><a href="github.com/Castau">cs340 - Camilla Jenny Valerius Staunstrup</a></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <Card.Title>SPECIAL THANKS TO</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><a href="http://restcountries.eu/">REST Countries</a></ListGroup.Item>
                                    <ListGroup.Item><a href="http://www.geonames.org/">GeoNames</a></ListGroup.Item>
                                    <ListGroup.Item><a href="https://developer.ticketmaster.com/">Ticketmaster API</a></ListGroup.Item>
                                    <ListGroup.Item><a href="https://simplemaps.com/resources/svg-europe">SimpleMaps</a></ListGroup.Item>
                                    <ListGroup.Item><a href="https://ajuhlhansen.dk/WeatherCloud/api/weather ">Hold Chokobananen API</a></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Row>
            </Container>
        </>
    );
};

export default About;