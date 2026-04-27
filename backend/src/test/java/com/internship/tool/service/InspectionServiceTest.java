package com.internship.tool.service;

import com.internship.tool.entity.Inspection;
import com.internship.tool.repository.InspectionRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InspectionServiceTest {

    @Mock
    private InspectionRepository repository;

    @InjectMocks
    private InspectionService service;

    // ✅ Test: Get by ID (Success)
    @Test
    void testGetInspectionById() {
        Inspection inspection = new Inspection();
        inspection.setId(1L);
        inspection.setName("Test");

        when(repository.findById(1L)).thenReturn(Optional.of(inspection));

        Inspection result = service.getInspectionById(1L);

        assertEquals("Test", result.getName());
    }

    // ✅ Test: Get by ID (Not Found)
    @Test
    void testGetInspection_NotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            service.getInspectionById(1L);
        });
    }

    // ✅ Test: Create Inspection
    @Test
    void testCreateInspection() {
        Inspection inspection = new Inspection();
        inspection.setName("New");

        when(repository.save(any())).thenReturn(inspection);

        Inspection result = service.createInspection(inspection);

        assertEquals("New", result.getName());
    }

    // ✅ Test: Get All Inspections (Pagination)
    @Test
    void testGetAllInspections() {
        Inspection inspection = new Inspection();
        inspection.setId(1L);
        inspection.setName("Sample");

        Page<Inspection> page = new PageImpl<>(List.of(inspection));

        when(repository.findAll(any(PageRequest.class))).thenReturn(page);

        Page<Inspection> result = service.getAllInspections(0, 5);

        assertEquals(1, result.getTotalElements());
    }
}