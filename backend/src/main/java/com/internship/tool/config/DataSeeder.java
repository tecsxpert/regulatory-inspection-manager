package com.internship.tool.config;

import com.internship.tool.entity.Inspection;
import com.internship.tool.repository.InspectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(InspectionRepository repository) {
        return args -> {

            // 🔥 Force reset (so it always inserts 30)
            repository.deleteAll();

            for (int i = 1; i <= 30; i++) {
                Inspection inspection = new Inspection();
                inspection.setName("Inspection " + i);
                repository.save(inspection);
            }

            System.out.println("✅ 30 Inspections inserted!");
        };
    }
}