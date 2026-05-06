package com.internship.tool.service;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class AiServiceClient {

    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public AiServiceClient(RestTemplateBuilder builder) {

        this.restTemplate = builder
                .setConnectTimeout(Duration.ofSeconds(10))
                .setReadTimeout(Duration.ofSeconds(10))
                .build();
    }

    public Map<String, Object> generateDescription(String input) {

        try {

            String url = aiServiceUrl + "/describe";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("input", input);

            HttpEntity<Map<String, String>> request =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            url,
                            request,
                            Map.class
                    );

            // Null-safe response
            if (response.getBody() == null) {

                log.error("Null response from AI service");

                return fallbackResponse();
            }

            return response.getBody();

        } catch (Exception e) {

            log.error("AI Service Error: {}", e.getMessage());

            return fallbackResponse();
        }
    }

    private Map<String, Object> fallbackResponse() {

        Map<String, Object> fallback = new HashMap<>();

        fallback.put("success", false);
        fallback.put("is_fallback", true);
        fallback.put(
                "response",
                "AI service temporarily unavailable"
        );

        return fallback;
    }
}
