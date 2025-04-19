package com.feilan.jobtracker.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for performing CRUD operations on JobApplication entities.
 * Extends JpaRepository to inherit basic CRUD and pagination methods.
 */
@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // No additional methods needed for basic operations (save, findAll, deleteById, etc.)
}
