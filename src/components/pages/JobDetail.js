import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaBuilding, FaBriefcase, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import moment from 'moment';
import { getJobById } from '../../services/jobService';
import LoadingSpinner from '../LoadingSpinner';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return (
      <Container className="my-5 text-center">
        <h2>Job not found</h2>
        <p>The job you're looking for doesn't exist or may have been removed.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                {job.companyLogo && (
                  <img 
                    src={job.companyLogo} 
                    alt={job.companyName} 
                    className="me-4" 
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
                  />
                )}
                <div>
                  <Card.Title as="h2">{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted fs-5">
                    <FaBuilding className="me-1" /> {job.companyName}
                  </Card.Subtitle>
                </div>
              </div>

              <div className="mb-4">
                <h4>Job Description</h4>
                <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />
              </div>

              <Row className="mb-4">
                <Col md={6}>
                  <h5>Experience Required</h5>
                  <p><FaBriefcase className="me-2" /> {job.experience}</p>
                </Col>
                <Col md={6}>
                  <h5>Posted Date</h5>
                  <p><FaCalendarAlt className="me-2" /> {moment(job.postedDate).format('MMMM D, YYYY')}</p>
                </Col>
              </Row>

              <div className="d-grid gap-2">
                <Button 
                  href={job.applyURL} 
                  target="_blank" 
                  variant="success" 
                  size="lg"
                  className="d-flex align-items-center justify-content-center"
                >
                  Apply Now <FaExternalLinkAlt className="ms-2" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;