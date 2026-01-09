package com.military.assetmanagement.dto;



import java.time.LocalDate;

public class AssignmentDTO {
    private String base;
    private String equipmentType;
    private Integer quantity;
    private LocalDate assignedDate;

    
    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }

    public String getEquipmentType() { return equipmentType; }
    public void setEquipmentType(String equipmentType) { this.equipmentType = equipmentType; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDate getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDate assignedDate) { this.assignedDate = assignedDate; }
}
