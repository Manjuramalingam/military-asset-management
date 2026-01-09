package com.military.assetmanagement.controller;

import com.military.assetmanagement.dto.PurchaseRequest;
import com.military.assetmanagement.entity.Purchase;
import com.military.assetmanagement.repository.PurchaseRepository;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;

    public PurchaseController(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @PostMapping
    public Purchase createPurchase(@RequestBody PurchaseRequest request) {
        Purchase purchase = new Purchase();
        purchase.setBase(request.getBase());
        purchase.setEquipmentType(request.getEquipmentType());
        purchase.setQuantity(request.getQuantity());
        purchase.setPurchaseDate(request.getPurchaseDate());
        return purchaseRepository.save(purchase);
    }

    
    @GetMapping
    public List<Purchase> getPurchases(
            @RequestParam(required = false, defaultValue = "") String base,
            @RequestParam(required = false, defaultValue = "") String equipmentType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.of(2000,1,1);
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();
        return purchaseRepository.findByBaseContainingAndEquipmentTypeContainingAndPurchaseDateBetween(
                base, equipmentType, start, end
        );
    }
}
