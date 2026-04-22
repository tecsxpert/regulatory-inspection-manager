package com.internship.tool.service;

import com.internship.tool.entity.Inspection;
import com.internship.tool.repository.InspectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InspectionService {

    private final InspectionRepository repository;

    public InspectionService(InspectionRepository repository) {
        this.repository = repository;
    }

    public Inspection createInspection(Inspection inspection) {
        return repository.save(inspection);
    }

    public List<Inspection> getAllInspections() {
        return repository.findAll();
    }
}