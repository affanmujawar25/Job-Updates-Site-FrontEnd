import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Button, Spinner, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllJobs, deleteJob } from '../../../services/jobService';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';

const JobListAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job.jobID !== id));
        toast.success('Job deleted successfully');
      } catch (err) {
        toast.error('Failed to delete job');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Job Listings</h1>
        <Button as={Link} to="/admin/jobs/new" variant="primary">
          <FaPlus className="me-2" /> Add New Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Alert variant="info">No jobs found. Add a new job to get started.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Company</th>
              <th>Experience</th>
              <th>Posted Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.jobID}>
                <td>{job.jobID}</td>
                <td>{job.title}</td>
                <td>{job.companyName}</td>
                <td>{job.experience}</td>
                <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      as={Link} 
                      to={`/admin/jobs/edit/${job.jobID}`} 
                      variant="warning" 
                      size="sm"
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(job.jobID)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default JobListAdmin;