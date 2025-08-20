import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>JobPortal</h5>
            <p>Find your dream job with us.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/jobs" className="text-white">Jobs</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/contact" className="text-white">Contact Us</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <address>
              <p>123 Job Street<br />City, State 12345<br />Email: info@jobportal.com</p>
            </address>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;