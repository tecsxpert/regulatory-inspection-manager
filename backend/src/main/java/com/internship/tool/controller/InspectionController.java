package com.internship.tool.controller;

import com.internship.tool.entity.Inspection;
import com.internship.tool.service.InspectionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    private final InspectionService service;

    public InspectionController(InspectionService service) {
        this.service = service;
    }

    // ✅ GET ALL (Paginated)
    @GetMapping("/all")
    public ResponseEntity<Page<Inspection>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(service.getAllInspections(page, size));
    }

    // ✅ GET BY ID (with 404)
    @GetMapping("/{id}")
    public ResponseEntity<Inspection> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getInspectionById(id));
    }

    // ✅ CREATE (with validation)
    @PostMapping("/create")
    public ResponseEntity<Inspection> create(@Valid @RequestBody Inspection inspection) {
        return ResponseEntity.status(201).body(service.createInspection(inspection));
    }
}