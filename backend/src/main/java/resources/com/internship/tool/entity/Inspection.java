package com.internship.tool.entity;

import jakarta.persistence.*;
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

    private String inspectorName;

    private String inspectionType;

    private String status;

    private String remarks;
}