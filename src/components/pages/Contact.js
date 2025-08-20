import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { submitContactForm } from '../../services/api';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactForm(formData);
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">Contact Us</h1>
          <p className="text-center">Have questions? Get in touch with our team.</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>Address</h3>
              <p className="mb-0">
                123 Job Street<br />
                City, State 12345<br />
                Country
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>Email</h3>
              <p className="mb-0">
                info@jobportal.com<br />
                support@jobportal.com
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>Phone</h3>
              <p className="mb-0">
                +1 (123) 456-7890<br />
                Mon-Fri: 9am-5pm
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;