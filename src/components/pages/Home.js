import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JobCard from '../JobCard';
import { getFeaturedJobs } from '../../services/jobService';
import LoadingSpinner from '../LoadingSpinner';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getFeaturedJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 mb-4">Find Your Dream Job</h1>
            <p className="lead">
              Browse through hundreds of job listings and find the perfect match for your skills and experience.
            </p>
            <Button as={Link} to="/jobs" variant="primary" size="lg" className="mt-3">
              Browse Jobs
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Featured Jobs</h2>
          {jobs.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {jobs.map(job => (
                <Col key={job.jobID}>
                  <JobCard job={job} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No featured jobs available at the moment.</p>
          )}
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>About Us</h3>
              <p>
                Learn more about our mission to connect job seekers with employers and help people find their dream careers.
              </p>
              <Button as={Link} to="/about" variant="outline-primary">
                Read More
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3>Contact Us</h3>
              <p>
                Have questions? Get in touch with our team for more information about our services.
              </p>
              <Button as={Link} to="/contact" variant="outline-primary">
                Contact Form
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;