package com.internship.tool.service;

import com.internship.tool.entity.Inspection;
import com.internship.tool.repository.InspectionRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class InspectionService {

    private final InspectionRepository repository;

    public InspectionService(InspectionRepository repository) {
        this.repository = repository;
    }

    // ✅ CREATE (UPDATED WITH AI)
    public Inspection createInspection(Inspection inspection) {

        // 🔥 Dummy AI logic (simple and enough)
        String aiResult = "AI Verified";

        // ✅ set AI result
        inspection.setAiResult(aiResult);

        return repository.save(inspection);
    }

    // ✅ GET ALL
    @Cacheable(value = "inspections")
    public Page<Inspection> getAllInspections(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    // ✅ GET BY ID
    public Inspection getInspectionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inspection not found"));
    }
}