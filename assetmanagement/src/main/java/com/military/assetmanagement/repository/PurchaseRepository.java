package com.military.assetmanagement.repository;

import com.military.assetmanagement.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByBaseContainingAndEquipmentTypeContainingAndPurchaseDateBetween(
        String base, String equipmentType, LocalDate startDate, LocalDate endDate);
}
