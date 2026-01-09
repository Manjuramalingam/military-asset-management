package com.military.assetmanagement.dto;

import java.time.LocalDate;

public class PurchaseRequest {
    private String base;
    private String equipmentType;
    private int quantity;
    private LocalDate purchaseDate;

    
    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }

    public String getEquipmentType() { return equipmentType; }
    public void setEquipmentType(String equipmentType) { this.equipmentType = equipmentType; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }
}
