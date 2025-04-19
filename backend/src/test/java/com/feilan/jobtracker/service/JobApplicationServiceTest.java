package com.feilan.jobtracker.service;

import com.feilan.jobtracker.domain.ApplicationStatus;
import com.feilan.jobtracker.domain.JobApplication;
import com.feilan.jobtracker.domain.JobApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for JobApplicationService class.
 * This test class verifies business logic using mock repository.
 */
class JobApplicationServiceTest {

    @Mock
    private JobApplicationRepository jobApplicationRepository;

    @InjectMocks
    private JobApplicationService jobApplicationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreate() {
        JobApplication app = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        when(jobApplicationRepository.save(app)).thenReturn(app);

        JobApplication created = jobApplicationService.create(app);
        assertEquals("Google", created.getCompany());
        verify(jobApplicationRepository).save(app);
    }

    @Test
    void testGetAll() {
        JobApplication app1 = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        JobApplication app2 = new JobApplication("Amazon", "SWE", LocalDate.now(), ApplicationStatus.INTERVIEW);
        when(jobApplicationRepository.findAll()).thenReturn(Arrays.asList(app1, app2));

        List<JobApplication> result = jobApplicationService.getAll();
        assertEquals(2, result.size());
        verify(jobApplicationRepository).findAll();
    }

    @Test
    void testGetById() {
        JobApplication app = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        when(jobApplicationRepository.findById(1L)).thenReturn(Optional.of(app));

        Optional<JobApplication> found = jobApplicationService.getById(1L);
        assertTrue(found.isPresent());
        assertEquals("Engineer", found.get().getPosition());
        verify(jobApplicationRepository).findById(1L);
    }

    @Test
    void testUpdateStatus() {
        JobApplication app = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        when(jobApplicationRepository.findById(1L)).thenReturn(Optional.of(app));
        when(jobApplicationRepository.save(app)).thenReturn(app);

        Optional<JobApplication> updated = jobApplicationService.updateStatus(1L, ApplicationStatus.OFFER);
        assertTrue(updated.isPresent());
        assertEquals(ApplicationStatus.OFFER, updated.get().getStatus());
    }

    @Test
    void testDelete() {
        // We only verify that the repository method is called
        jobApplicationService.delete(1L);
        verify(jobApplicationRepository).deleteById(1L);
    }
}
