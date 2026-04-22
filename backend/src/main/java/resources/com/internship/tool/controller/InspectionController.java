package com.internship.tool.controller;

import com.internship.tool.entity.Inspection;
import com.internship.tool.service.InspectionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    private final InspectionService service;

    public InspectionController(InspectionService service) {
        this.service = service;
    }

    @PostMapping
    public Inspection createInspection(@RequestBody Inspection inspection) {
        return service.createInspection(inspection);
    }

    @GetMapping
    public List<Inspection> getAllInspections() {
        return service.getAllInspections();
    }
}