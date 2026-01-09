package com.military.assetmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String base;

    @Column(name = "equipment_type", nullable = false)
    private String equipmentType;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "assigned_to", nullable = false)
    private String assignedTo;

    @Column(name = "assigned_date", nullable = false)
    private LocalDate assignedDate;

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }

    public String getEquipmentType() { return equipmentType; }
    public void setEquipmentType(String equipmentType) { this.equipmentType = equipmentType; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }

    public LocalDate getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDate assignedDate) { this.assignedDate = assignedDate; }
}
