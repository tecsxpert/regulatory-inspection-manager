package com.internship.tool.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "inspections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Inspector name is required")
    private String inspectorName;

    @NotBlank(message = "Inspection type is required")
    private String inspectionType;

    @NotBlank(message = "Status is required")
    private String status;

    private String remarks;
}