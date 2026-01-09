package com.military.assetmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenditures")
public class Expenditure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String base;

    @Column(name = "equipment_type", nullable = false)
    private String equipmentType;

    @Column(nullable = false)
    private int quantity;

    @Column
    private String reason;

    @Column(name = "expended_date", nullable = false)
    private LocalDate expendedDate;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getExpendedDate() {
        return expendedDate;
    }

    public void setExpendedDate(LocalDate expendedDate) {
        this.expendedDate = expendedDate;
    }
}
