package com.internship.tool.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ReminderService {

    private final EmailService emailService;

    public ReminderService(EmailService emailService) {
        this.emailService = emailService;
    }

    // Runs every 1 minute (for testing)
    @Scheduled(fixedRate = 60000)
    public void sendReminder() {

        System.out.println("Sending reminder email...");

        emailService.sendHtmlEmail("shivardhiniksh@gmail.com");
    }
}