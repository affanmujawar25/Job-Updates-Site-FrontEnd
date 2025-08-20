import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import JobCard from '../JobCard';
import { getAllJobs } from '../../services/jobService';
import LoadingSpinner from '../LoadingSpinner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, jobs]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Job Listings</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Form>
            <Form.Group controlId="searchJobs">
              <Form.Control
                type="text"
                placeholder="Search jobs by title, company or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          {filteredJobs.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredJobs.map(job => (
                <Col key={job.jobID}>
                  <JobCard job={job} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <h4>No jobs found matching your search criteria.</h4>
              <Button variant="link" onClick={() => setSearchTerm('')}>
                Clear search
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Jobs;