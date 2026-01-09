package com.military.assetmanagement.controller;


import com.military.assetmanagement.dto.TransferDTO;
import com.military.assetmanagement.entity.Transfer;
import com.military.assetmanagement.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "http://localhost:3000") 
public class TransferController {

    @Autowired
    private TransferRepository transferRepository;

    
    @GetMapping
    public ResponseEntity<List<Transfer>> getAllTransfers() {
        List<Transfer> transfers = transferRepository.findAll();
        return ResponseEntity.ok(transfers);
    }

   
    @PostMapping
    public ResponseEntity<?> createTransfer(@RequestBody TransferDTO transferDTO) {
        if (transferDTO.getFromBase() == null || transferDTO.getToBase() == null ||
            transferDTO.getEquipmentType() == null || transferDTO.getQuantity() == null ||
            transferDTO.getTransferDate() == null) {
            return ResponseEntity.badRequest().body("All fields are required");
        }

        Transfer transfer = new Transfer();
        transfer.setFromBase(transferDTO.getFromBase());
        transfer.setToBase(transferDTO.getToBase());
        transfer.setEquipmentType(transferDTO.getEquipmentType());
        transfer.setQuantity(transferDTO.getQuantity());
        transfer.setTransferDate(transferDTO.getTransferDate());

        Transfer savedTransfer = transferRepository.save(transfer);
        return ResponseEntity.ok(savedTransfer);
    }
}
