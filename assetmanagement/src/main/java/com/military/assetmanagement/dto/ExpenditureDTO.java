package com.military.assetmanagement.dto;

import java.time.LocalDate;

public class ExpenditureDTO {
    private String base;
    private String equipmentType;
    private Integer quantity;
    private LocalDate expenditureDate;

   
    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }

    public String getEquipmentType() { return equipmentType; }
    public void setEquipmentType(String equipmentType) { this.equipmentType = equipmentType; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDate getExpenditureDate() { return expenditureDate; }
    public void setExpenditureDate(LocalDate expenditureDate) { this.expenditureDate = expenditureDate; }
}
