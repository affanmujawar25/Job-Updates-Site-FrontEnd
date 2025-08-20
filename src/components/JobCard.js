import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBuilding, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';

const JobCard = ({ job }) => {
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          {job.companyLogo && (
            <img 
              src={job.companyLogo} 
              alt={job.companyName} 
              className="me-3" 
              style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
            />
          )}
          <div>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <FaBuilding className="me-1" /> {job.companyName}
            </Card.Subtitle>
          </div>
        </div>
        <Card.Text className="text-truncate" style={{ maxHeight: '100px', overflow: 'hidden' }}>
          {job.description}
        </Card.Text>
        <div className="mb-3">
          <small className="text-muted">
            <FaBriefcase className="me-1" /> {job.experience}
          </small>
          <br />
          <small className="text-muted">
            <FaCalendarAlt className="me-1" /> Posted {moment(job.postedDate).fromNow()}
          </small>
        </div>
        <div className="d-flex justify-content-between">
          <Button as={Link} to={`/jobs/${job.jobID}`} variant="primary" size="sm">
            View Details
          </Button>
          <Button href={job.applyURL} target="_blank" variant="success" size="sm">
            Apply Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;