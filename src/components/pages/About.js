import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">About Us</h1>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-4">Our Mission</h2>
              <p>
                At JobPortal, our mission is to connect talented professionals with the best job opportunities 
                that match their skills and career aspirations. We strive to make the job search process 
                efficient, transparent, and rewarding for both job seekers and employers.
              </p>

              <h2 className="mb-4 mt-5">Our Story</h2>
              <p>
                Founded in 2023, JobPortal started as a small initiative to help local businesses find 
                qualified candidates. Today, we've grown into a comprehensive job search platform serving 
                thousands of job seekers and employers across various industries.
              </p>

              <h2 className="mb-4 mt-5">Why Choose Us?</h2>
              <ul>
                <li className="mb-2">Extensive database of job listings from reputable companies</li>
                <li className="mb-2">User-friendly interface with advanced search capabilities</li>
                <li className="mb-2">Personalized job recommendations based on your profile</li>
                <li className="mb-2">Resources and tips to help you succeed in your job search</li>
                <li className="mb-2">Dedicated customer support to assist you</li>
              </ul>

              <h2 className="mb-4 mt-5">Our Team</h2>
              <p>
                Our team consists of passionate professionals with expertise in recruitment, technology, 
                and career counseling. We're committed to continuously improving our platform to better 
                serve our users.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;