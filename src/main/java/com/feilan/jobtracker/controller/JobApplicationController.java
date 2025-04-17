package com.feilan.jobtracker.controller;

import com.feilan.jobtracker.domain.JobApplication;
import com.feilan.jobtracker.domain.ApplicationStatus;
import com.feilan.jobtracker.service.JobApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for handling job application operations.
 * Provides endpoints for creating, retrieving, updating, and deleting job applications.
 */
@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    // Constructor-based injection of JobApplicationService
    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    /**
     * Create a new job application.
     *
     * @param jobApplication the job application to create
     * @return the saved job application
     */
    @PostMapping
    public ResponseEntity<JobApplication> createJobApplication(@RequestBody JobApplication jobApplication) {
        JobApplication created = jobApplicationService.create(jobApplication);
        return ResponseEntity.ok(created);
    }

    /**
     * Get all job applications.
     *
     * @return a list of job applications
     */
    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(jobApplicationService.getAll());
    }

    /**
     * Get a single job application by ID.
     *
     * @param id the ID of the job application
     * @return the found application or 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getById(@PathVariable Long id) {
        Optional<JobApplication> application = jobApplicationService.getById(id);
        return application.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Update the status of a job application.
     *
     * @param id the ID of the job application
     * @param status the new status to set
     * @return the updated application or 404 if not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {
        Optional<JobApplication> updated = jobApplicationService.updateStatus(id, status);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete a job application by ID.
     *
     * @param id the ID of the job application
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
