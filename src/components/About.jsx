import React from 'react';
import {Card, ListGroup, CardGroup, Container, Row} from 'react-bootstrap';
import styles from './AboutStyles.css';
import {GithubIcon} from './Icons';

const About = () => {
	return (
		<>
			<Container className="mt-5 mb-5 aboutBorder">
				<Row className="justify-content-md-center">
					<CardGroup className="w-75">
						<Card className="mr-2">
							<Card.Body>
								<div className="aboutHeader">
									<Card.Title>ABOUT</Card.Title>
									<Card.Text>
										A.P. Computer Science 3. semester exam project, created by
										Hold Krykke
									</Card.Text>
								</div>
								<ListGroup className="about_link_github" variant="flush">
									<ListGroup.Item>
										<a href="http://github.com/Runi-VN" target="blank">
											<GithubIcon />
											<span className="ml-2">Rúni Vedel Niclassen</span>
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href="http://github.com/MalteMagnussen" target="blank">
											<GithubIcon />
											<span className="ml-2">Malte Hviid-Magnussen</span>
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href="http://github.com/HrBjarup" target="blank">
											<GithubIcon />
											<span className="ml-2">Asger Koch Bjarup</span>
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href="http://github.com/Castau" target="blank">
											<GithubIcon />
											<span className="ml-2">
												Camilla Jenny Valerius Staunstrup
											</span>
										</a>
									</ListGroup.Item>
								</ListGroup>
							</Card.Body>
						</Card>
						<Card className="ml-2">
							<Card.Body>
								<div className="aboutHeader">
									<Card.Title>SPECIAL THANKS TO</Card.Title>
									<Card.Text>
										The resources and API's used in this project. Thank you for
										creating resources free of charge.
									</Card.Text>
								</div>
								<ListGroup className="about_link" variant="flush">
									<ListGroup.Item>
										<a href="http://restcountries.eu/" target="blank">
											REST Countries
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href="http://www.geonames.org/" target="blank">
											GeoNames
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="https://developer.ticketmaster.com/"
											target="blank">
											Ticketmaster API
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="https://simplemaps.com/resources/svg-europe"
											target="blank">
											SimpleMaps
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="https://ajuhlhansen.dk/WeatherCloud/api/weather "
											target="blank">
											Hold Chokobananen API
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href="https://catfact.ninja/" target="blank">
											CatFact API
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a href="http://www.icndb.com/about/" target="blank">
											The Internet Chuck Norris Database API
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="https://github.com/lukePeavey/quotable"
											target="blank">
											Quotable - Random quotes API
										</a>
									</ListGroup.Item>
									<ListGroup.Item>
										<a
											href="https://fontawesome.com/icons/crutch?style=solid"
											target="blank">
											Font Awesome Crutch Icon
										</a>
									</ListGroup.Item>
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
