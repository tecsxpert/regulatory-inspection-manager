package com.internship.tool.service;

import com.internship.tool.entity.Inspection;
import com.internship.tool.repository.InspectionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InspectionServiceTest {

    @Mock
    private InspectionRepository repository;

    @InjectMocks
    private InspectionService service;

    @Test
    void testGetInspectionById() {
        Inspection inspection = new Inspection();
        inspection.setId(1L);

        when(repository.findById(1L)).thenReturn(Optional.of(inspection));

        Inspection result = service.getInspectionById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void testInspectionNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        Exception ex = assertThrows(RuntimeException.class, () -> {
            service.getInspectionById(1L);
        });

        assertEquals("Inspection not found", ex.getMessage());
    }

    @Test
    void testCreateInspection() {
        Inspection inspection = new Inspection();

        when(repository.save(inspection)).thenReturn(inspection);

        Inspection result = service.createInspection(inspection);

        assertNotNull(result);
        verify(repository, times(1)).save(inspection);
    }
}