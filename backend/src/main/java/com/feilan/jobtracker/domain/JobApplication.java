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

        /**
     * Source of the application (e.g., Seek, LinkedIn, Referral).
     */
    @Column
    private String source;

    /**
     * Additional note for this application.
     */
    @Column(length = 2000)
    private String note;


    // Constructors

    public JobApplication() {
        // Default constructor required by JPA
    }

    /**
     * Constructor with 4 parameters.
     * This is maintained to ensure compatibility with existing test cases 
     * and previous versions of the application.
     *
     * @param company     The name of the company applied to
     * @param position    The job title or position
     * @param dateApplied The date the application was submitted
     * @param status      The current status of the application
     */
    public JobApplication(String company, String position, LocalDate dateApplied, ApplicationStatus status) {
        this.company = company;
        this.position = position;
        this.dateApplied = dateApplied;
        this.status = status;
    }
    //Constructor with 6 parameters.
    public JobApplication(String company, String position, LocalDate dateApplied, ApplicationStatus status,String source, String note) {
        this.company = company;
        this.position = position;
        this.dateApplied = dateApplied;
        this.status = status;
        this.source = source;
        this.note = note;
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
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}
