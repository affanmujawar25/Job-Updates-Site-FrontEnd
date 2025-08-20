import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { getJobById, createJob, updateJob } from '../../../services/jobService';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [job, setJob] = useState({
    title: '',
    companyName: '',
    companyLogo: '',
    description: '',
    experience: '',
    applyURL: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [existingLogo, setExistingLogo] = useState('');

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const data = await getJobById(id);
          setJob(data);
          setExistingLogo(data.companyLogo || '');
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch job details');
          console.error(err);
          setLoading(false);
        }
      };
      fetchJob();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', job.title);
      formData.append('companyName', job.companyName);
      formData.append('description', job.description);
      formData.append('experience', job.experience);
      formData.append('applyURL', job.applyURL);
      if (logoFile) {
        formData.append('companyLogo', logoFile);
      }
      if (existingLogo) {
        formData.append('existingLogo', existingLogo);
      }

      if (id) {
        await updateJob(id, formData);
        toast.success('Job updated successfully');
      } else {
        await createJob(formData);
        toast.success('Job created successfully');
      }
      navigate('/admin/jobs');
    } catch (err) {
      toast.error('Error saving job');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">{id ? 'Edit Job' : 'Add New Job'}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={job.companyName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="companyLogo">
              <Form.Label>Company Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {existingLogo && !logoFile && (
                <div className="mt-2">
                  <p>Current Logo:</p>
                  <img 
                    src={existingLogo} 
                    alt="Company Logo" 
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={job.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="experience">
              <Form.Label>Required Experience</Form.Label>
              <Form.Control
                type="text"
                name="experience"
                value={job.experience}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="applyURL">
              <Form.Label>Apply URL</Form.Label>
              <Form.Control
                type="url"
                name="applyURL"
                value={job.applyURL}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/admin/jobs')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Job'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobForm;