package com.feilan.jobtracker.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.feilan.jobtracker.domain.ApplicationStatus;
import com.feilan.jobtracker.domain.JobApplication;
import com.feilan.jobtracker.service.JobApplicationService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JobApplicationController.class)
public class JobApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobApplicationService jobApplicationService;

    @Autowired
    private ObjectMapper objectMapper;

    // 1. Get All Applications
    @Test
    void testGetAllApplications() throws Exception {
        JobApplication app1 = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        JobApplication app2 = new JobApplication("OpenAI", "AI Engineer", LocalDate.now(), ApplicationStatus.INTERVIEW);
        Mockito.when(jobApplicationService.getAll()).thenReturn(Arrays.asList(app1, app2));

        mockMvc.perform(get("/api/job-application-tracker"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    // 2. Get Application by ID
    @Test
    void testGetApplicationById() throws Exception {
        JobApplication app = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        Mockito.when(jobApplicationService.getById(1L)).thenReturn(Optional.of(app));

        mockMvc.perform(get("/api/job-application-tracker/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Google"));
    }

    // 3. Create Application
    @Test
    void testCreateApplication() throws Exception {
        JobApplication app = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.APPLIED);
        Mockito.when(jobApplicationService.create(Mockito.any(JobApplication.class))).thenReturn(app);

        mockMvc.perform(post("/api/job-application-tracker")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(app)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.position").value("Engineer"));
    }

    //  4. Update Status
    @Test
    void testUpdateStatus() throws Exception {
        JobApplication updatedApp = new JobApplication("Google", "Engineer", LocalDate.now(), ApplicationStatus.INTERVIEW);
        Mockito.when(jobApplicationService.updateStatus(1L, ApplicationStatus.INTERVIEW)).thenReturn(Optional.of(updatedApp));

        String response = mockMvc.perform(put("/api/job-application-tracker/1?status=INTERVIEW"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("INTERVIEW"))
                .andReturn()
                .getResponse()
                .getContentAsString();

    }


    // 5. Delete Application
    @Test
    void testDeleteApplication() throws Exception {
        mockMvc.perform(delete("/api/job-application-tracker/1"))
                .andExpect(status().isNoContent());

        Mockito.verify(jobApplicationService).delete(1L);
    }
}
