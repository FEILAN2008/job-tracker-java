package com.feilan.jobtracker.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Represents a job application entity stored in the database.
 */
@Entity
@Table(name = "job_applications") // Table name in the database
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented primary key
    private Long id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String position;

    @Column(name = "date_applied", nullable = false)
    private LocalDate dateApplied;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    // Constructors

    public JobApplication() {
        // Default constructor required by JPA
    }

    public JobApplication(String company, String position, LocalDate dateApplied, ApplicationStatus status) {
        this.company = company;
        this.position = position;
        this.dateApplied = dateApplied;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public LocalDate getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(LocalDate dateApplied) {
        this.dateApplied = dateApplied;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}
