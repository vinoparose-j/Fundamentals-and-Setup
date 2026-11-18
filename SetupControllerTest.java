package com.internship.setup.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SetupControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void helloEndpointReturnsDefaultWorldGreeting() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.internName").value("World"))
                .andExpect(jsonPath("$.status").value("VERIFIED"))
                .andExpect(jsonPath("$.message", containsString("Hello, World!")));
    }

    @Test
    void helloEndpointAcceptsCustomInternName() throws Exception {
        mockMvc.perform(get("/api/hello").param("name", "Intern"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.internName").value("Intern"))
                .andExpect(jsonPath("$.message", containsString("Hello, Intern!")));
    }

    @Test
    void healthEndpointReturnsUpStatus() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("phase1-setup-backend"));
    }

    @Test
    void environmentEndpointReturnsRuntimeDiagnostics() throws Exception {
        mockMvc.perform(get("/api/environment"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.role").value("Java Full-Stack Developer"))
                .andExpect(jsonPath("$.conventions", hasSize(5)));
    }

    @Test
    void onboardingEndpointReturnsAllElevenObjectives() throws Exception {
        mockMvc.perform(get("/api/onboarding"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(11)))
                .andExpect(jsonPath("$[0].stepNumber").value(1))
                .andExpect(jsonPath("$[6].title", containsString("Hello World")));
    }
}
