package com.internship.tool.controller;

import com.internship.tool.entity.Inspection;
import com.internship.tool.service.InspectionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    private final InspectionService service;

    public InspectionController(InspectionService service) {
        this.service = service;
    }

    // ✅ GET ALL (Paginated + Error Handling)
    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        try {
            return ResponseEntity.ok(
                    service.getAllInspections(page, size).getContent()
            );
        } catch (Exception e) {
            e.printStackTrace(); // shows real error in console
            return ResponseEntity.status(500)
                    .body("Error fetching inspections: " + e.getMessage());
        }
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.getInspectionById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body("Inspection not found");
        }
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Inspection inspection) {
        try {
            return ResponseEntity.status(201)
                    .body(service.createInspection(inspection));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Error creating inspection: " + e.getMessage());
        }
    }
}