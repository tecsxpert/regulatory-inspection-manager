package com.internship.tool.service;

import com.internship.tool.entity.Inspection;
import com.internship.tool.repository.InspectionRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Service
public class InspectionService {

    private final InspectionRepository repository;

    public InspectionService(InspectionRepository repository) {
        this.repository = repository;
    }

    // ✅ CREATE (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @CacheEvict(value = "inspections", allEntries = true)
    public Inspection createInspection(Inspection inspection) {
        return repository.save(inspection);
    }

    // ✅ GET ALL (USER + ADMIN)
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @Cacheable("inspections")
    public Page<Inspection> getAllInspections(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    // ✅ GET BY ID
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @Cacheable(value = "inspection", key = "#id")
    public Inspection getInspectionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inspection not found"));
    }
}