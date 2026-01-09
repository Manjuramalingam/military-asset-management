package com.military.assetmanagement.dto;


import java.time.LocalDate;

public class TransferDTO {
    private String fromBase;
    private String toBase;
    private String equipmentType;
    private Integer quantity;
    private LocalDate transferDate;

    
    public String getFromBase() { return fromBase; }
    public void setFromBase(String fromBase) { this.fromBase = fromBase; }

    public String getToBase() { return toBase; }
    public void setToBase(String toBase) { this.toBase = toBase; }

    public String getEquipmentType() { return equipmentType; }
    public void setEquipmentType(String equipmentType) { this.equipmentType = equipmentType; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDate getTransferDate() { return transferDate; }
    public void setTransferDate(LocalDate transferDate) { this.transferDate = transferDate; }
}

