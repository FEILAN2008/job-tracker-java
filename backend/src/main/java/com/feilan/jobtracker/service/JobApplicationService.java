package com.feilan.jobtracker.service;

import com.feilan.jobtracker.domain.JobApplication;
import com.feilan.jobtracker.domain.ApplicationStatus;
import com.feilan.jobtracker.domain.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for handling business logic related to Job Applications.
 */
@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    // Inject repository via constructor
    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    // Create a new job application
    public JobApplication create(JobApplication jobApplication) {
            // Ensure note is never null
        if (jobApplication.getNote() == null) {
            jobApplication.setNote("");
        }
        return jobApplicationRepository.save(jobApplication);
    }

    // Get all job applications
    public List<JobApplication> getAll() {
        return jobApplicationRepository.findAll();
    }

    // Get a job application by ID
    public Optional<JobApplication> getById(Long id) {
        return jobApplicationRepository.findById(id);
    }

    // Update status of a job application
    public Optional<JobApplication> updateStatus(Long id, ApplicationStatus status) {
        return jobApplicationRepository.findById(id).map(app -> {
            app.setStatus(status);
            return jobApplicationRepository.save(app);
        });
    }

    // Delete a job application by ID
    public void delete(Long id) {
        jobApplicationRepository.deleteById(id);
    }
    // Add to JobApplicationService
public Optional<JobApplication> updateDetails(Long id, JobApplication updatedApp) {
    return jobApplicationRepository.findById(id).map(app -> {
        // Update the source and note fields
        app.setSource(updatedApp.getSource());
        app.setNote(updatedApp.getNote());
        
        // You can also update other fields like position here if needed
        // app.setPosition(updatedApp.getPosition());
        
        return jobApplicationRepository.save(app);
    });
}
}
