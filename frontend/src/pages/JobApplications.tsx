import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

// Define enum type in frontend to match backend ApplicationStatus
enum ApplicationStatus {
    APPLIED = "APPLIED",
    INTERVIEW = "INTERVIEW",
    OFFER = "OFFER",
    REJECTED = "REJECTED",
}

// Define type for job application
interface JobApplication {
    id: number;
    company: string;
    position: string;
    dateApplied: string;
    status: ApplicationStatus;
}

const JobApplications: React.FC = () => {
    // State to store all applications
    const [applications, setApplications] = useState<JobApplication[]>([]);
    // State for form input fields
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [statusMap, setStatusMap] = useState<Record<number, ApplicationStatus>>({});

    // 🟢 Return appropriate color for each status
    const getStatusColor = (status: ApplicationStatus): string => {
        switch (status) {
            case ApplicationStatus.OFFER:
                return "green";
            case ApplicationStatus.INTERVIEW:
                return "orange";
            case ApplicationStatus.REJECTED:
                return "gray";
            case ApplicationStatus.APPLIED:
                return "black";
            default:
                return "black";
        }
    };


    // Fetch applications from backend
    const fetchApplications = async () => {
        try {
            const response = await axios.get<JobApplication[]>("/api/job-application-tracker");
            setApplications(response.data);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        }
    };

    // Create a new job application
    const handleAddApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/job-application-tracker", {
                company,
                position,
                dateApplied: new Date().toISOString().split("T")[0],
                status: ApplicationStatus.APPLIED,
            });
            setCompany("");
            setPosition("");
            fetchApplications(); // Refresh the list
        } catch (error) {
            console.error("Failed to add application:", error);
        }
    };

    // Handle status change from dropdown
    const handleStatusChange = (id: number, newStatus: ApplicationStatus) => {
        setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    };

    // Update application status
    const handleUpdateStatus = async (id: number, newStatus: ApplicationStatus) => {
        try {
            await axios.put(`/api/job-application-tracker/${id}?status=${newStatus}`);
            fetchApplications(); // Refresh the list
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // Delete application
    const deleteApplication = async (id: number) => {
        try {
            await axios.delete(`/api/job-application-tracker/${id}`);
            fetchApplications();
        } catch (error) {
            console.error("Failed to delete application:", error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center fw-bold display-4">Job Application Tracker</h1>

            <form onSubmit={handleAddApplication} className="mb-4">

                    <style>
                        {`
                            input.form-control:focus {
                              outline: none;
                              box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); 
                              border-color: #007bff;
                            }
                        
                            .status-applied {
                              color: #007bff; 
                              font-weight: bold;
                            }
                        
                            .status-interview {
                              color: orange;
                              font-weight: bold;
                            }
                        
                            .status-offer {
                              color: green;
                              font-weight: bold;
                            }
                        
                            .status-rejected {
                              color: gray;
                              font-weight: bold;
                            }
                        
                            table {
                              border-collapse: collapse;
                              width: 100%;
                            }
                        
                            th, td {
                              border: 1px solid #dee2e6;
                              padding: 8px;
                            }
                        
                            th {
                              font-size: 1.1rem;
                            }
                        
                            button.btn-submit,
                            button.btn-update {
                              background-color: #007bff;
                              color: white;
                              border: none;
                              padding: 5px 10px;
                              border-radius: 4px;
                            }
                        
                            button.btn-delete {
                              background-color: red;
                              color: white;
                              border: none;
                              padding: 5px 10px;
                              border-radius: 4px;
                            }
                          `}
                    </style>

                <div className="mb-3">
                    <label className="form-label mb-3">Company Name ：</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{ width: "90%", fontSize: "1.0rem", marginTop: "10px" }}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label mb-2">Position ： </label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{ width: "90%", fontSize: "1.0rem", marginTop: "10px" }}
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit" style={{ marginTop: "10px" }} >Add New Job Application</button>
            </form>

            <h2 className="mb-3">Job Applications</h2>
            <Table striped bordered hover responsive>
                <thead className="fs-5">
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                        <td>{app.company}</td>
                        <td>{app.position}</td>
                        <td>{app.dateApplied}</td>
                        <td style={{fontWeight: "bold", color: getStatusColor(app.status)}}>
                            {app.status}
                        </td>
                        <td>
                            <select
                                className="form-select form-select-sm mb-2"
                                value={statusMap[app.id] || app.status}
                                onChange={(e) =>
                                    handleStatusChange(app.id, e.target.value as ApplicationStatus)
                                }
                            >
                                {Object.values(ApplicationStatus).map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => handleUpdateStatus(app.id, statusMap[app.id])}
                                    className="btn-update">Update
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={() => {
                                    // Show confirm dialog before actual deletion
                                    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
                                    if (confirmDelete) {
                                        deleteApplication(app.id);
                                    }
                                }}
                                className="btn-delete"
                            >
                                Delete
                            </button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default JobApplications;
