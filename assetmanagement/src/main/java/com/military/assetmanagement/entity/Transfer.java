package com.military.assetmanagement.entity;



import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transfer")
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_base", nullable = false)
    private String fromBase;

    @Column(name = "to_base", nullable = false)
    private String toBase;

    @Column(name = "equipment_type", nullable = false)
    private String equipmentType;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "transfer_date", nullable = false)
    private LocalDate transferDate;

    // Constructors
    public Transfer() {
    }

    public Transfer(String fromBase, String toBase, String equipmentType, Integer quantity, LocalDate transferDate) {
        this.fromBase = fromBase;
        this.toBase = toBase;
        this.equipmentType = equipmentType;
        this.quantity = quantity;
        this.transferDate = transferDate;
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFromBase() {
        return fromBase;
    }

    public void setFromBase(String fromBase) {
        this.fromBase = fromBase;
    }

    public String getToBase() {
        return toBase;
    }

    public void setToBase(String toBase) {
        this.toBase = toBase;
    }

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDate transferDate) {
        this.transferDate = transferDate;
    }
}
