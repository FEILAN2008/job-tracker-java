import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Pagination } from "react-bootstrap";

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

    const [searchTerm, setSearchTerm] = useState('');
    //  Filter applications based on search term (case-insensitive)
    const filteredApplications = applications.filter(
        (app) =>
            app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.position.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const [currentPage, setCurrentPage] = useState(1);  // current page number
    const pageSize = 5;
    //  Calculate total pages based on applications
    const totalPages = Math.ceil(applications.length / pageSize);
    //  Handle pagination button click
    // 🟦 Slice the data for current page
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    //  Generate pagination items dynamically
    const renderPaginationItems = () => {
        const items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };




    //  Return appropriate color for each status
    const getStatusColor = (status: ApplicationStatus): string => {
        switch (status) {
            case ApplicationStatus.OFFER:
                return "green";
            case ApplicationStatus.INTERVIEW:
                return "orange";
            case ApplicationStatus.REJECTED:
                return "gray";
            case ApplicationStatus.APPLIED:
                return "blue";
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
                              color: blue; 
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
                        style={{width: "90%", fontSize: "1.0rem", marginTop: "10px"}}
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
                        style={{width: "90%", fontSize: "1.0rem", marginTop: "10px"}}
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit" style={{marginTop: "10px"}}>Add New Job Application
                </button>
            </form>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    style={{width: "90%", fontSize: "1.0rem", marginTop: "10px"}}
                    placeholder="Search by company or position"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>


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
                {paginatedApplications.map((app) => (
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
            <div className="d-flex justify-content-center mt-4">
                <div className="btn-group">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lsaquo;
                    </button>

                    <button className="btn btn-primary" disabled>
                        {currentPage}
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &rsaquo;
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </button>
                    <style>
                        {`
                          .btn-group .btn {
                            font-size: 1.2rem;
                            padding: 0.5rem 1rem;
                            border-radius: 0.5rem;
                          }
                        
                          .btn-group .btn-primary {
                            background-color: #007bff;
                            border-color: #007bff;
                            color: white;
                            font-weight: bold;
                          }
                        
                          .btn-group .btn-outline-primary:focus,
                          .btn-group .btn-primary:focus {
                            box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5);
                          }
                        `}
                    </style>

                </div>
            </div>
        </div>
    );
};

export default JobApplications;
