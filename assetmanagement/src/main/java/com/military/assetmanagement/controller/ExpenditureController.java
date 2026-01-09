package com.military.assetmanagement.controller;

import com.military.assetmanagement.entity.Expenditure;
import com.military.assetmanagement.repository.ExpenditureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenditures")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenditureController {

    @Autowired
    private ExpenditureRepository expenditureRepository;

    @GetMapping
    public List<Expenditure> getAllExpenditures() {
        return expenditureRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createExpenditure(@RequestBody Expenditure expenditure) {

       
        if (expenditure.getBase() == null ||
            expenditure.getEquipmentType() == null ||
            expenditure.getQuantity() <= 0 ||
            expenditure.getExpendedDate() == null) {

            return ResponseEntity.badRequest()
                    .body("All fields are required");
        }

        try {
            Expenditure saved = expenditureRepository.save(expenditure);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving expenditure");
        }
    }

    
    @GetMapping("/total")
    public int getTotalQuantity() {
        return expenditureRepository.findAll()
                .stream()
                .mapToInt(Expenditure::getQuantity)
                .sum();
    }
}
