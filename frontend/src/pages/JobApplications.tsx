// @ts-ignore
import React, { useEffect, useState } from 'react';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { Button, Table, Spinner } from 'react-bootstrap';

interface JobApplication {
    id: number;
    company: string;
    position: string;
    dateApplied: string;
    applicationStatus: ApplicationStatus;
}

enum ApplicationStatus {
    APPLIED = 'APPLIED',
    INTERVIEW = 'INTERVIEW',
    OFFER = 'OFFER',
    REJECTED = 'REJECTED',
}

const statusColors: Record<ApplicationStatus, string> = {
    APPLIED: 'primary',
    INTERVIEW: 'warning',
    OFFER: 'success',
    REJECTED: 'secondary',
};

const JobApplications: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch applications on load
    const fetchApplications = async () => {
        try {
            const response = await axios.get<JobApplication[]>('/api/job-application-tracker');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching job applications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Delete a job application
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/job-application-tracker/${id}`);
            await fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    // Cycle through statuses
    const nextStatus = (status: ApplicationStatus): ApplicationStatus => {
        const statuses = Object.values(ApplicationStatus);
        const currentIndex = statuses.indexOf(status);
        return statuses[(currentIndex + 1) % statuses.length];
    };

    // Update application status
    const handleUpdateStatus = async (id: number, currentStatus: ApplicationStatus) => {
        const newStatus = nextStatus(currentStatus);
        try {
            await axios.put(`/api/job-application-tracker/${id}?status=${ApplicationStatus[newStatus]}`);
            await fetchApplications();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <Spinner animation="border" variant="primary" />;

    return (
        <div className="container mt-4">
            <h2>Job Applications</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                        <td>{app.company}</td>
                        <td>{app.position}</td>
                        <td>{app.dateApplied}</td>
                        <td>
                <span className={`text-${statusColors[app.applicationStatus]}`}>
                  {app.applicationStatus}
                </span>
                        </td>
                        <td>
                            <Button
                                variant="info"
                                size="sm"
                                onClick={() => handleUpdateStatus(app.id, app.applicationStatus)}
                            >
                                Update Status
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="ml-2"
                                onClick={() => handleDelete(app.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default JobApplications;
