package com.internship.tool.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(AiServiceClient.class);

    @Value("${ai.service.url:http://localhost:5000}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate;

    public AiServiceClient() {
        this.restTemplate = new RestTemplate();
    }

    public Map<String, Object> describe(String inputData) {
        return callAiEndpoint("/describe", inputData);
    }

    public Map<String, Object> recommend(String inputData) {
        return callAiEndpoint("/recommend", inputData);
    }

    public Map<String, Object> generateReport(String inputData) {
        return callAiEndpoint("/generate-report", inputData);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> callAiEndpoint(String endpoint, String inputData) {
        try {
            String url = aiServiceUrl + endpoint;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("input_data", inputData);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                logger.info("AI service call to {} succeeded", endpoint);
                return response.getBody();
            }

        } catch (ResourceAccessException e) {
            logger.error("AI service unreachable at {}: {}", endpoint, e.getMessage());
        } catch (Exception e) {
            logger.error("AI service call to {} failed: {}", endpoint, e.getMessage());
        }

        return null;
    }
}
