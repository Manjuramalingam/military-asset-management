package com.military.assetmanagement.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @GetMapping
    public Map<String, Integer> getDashboardMetrics() {

        Map<String, Integer> metrics = new HashMap<>();

        
        metrics.put("openingBalance", 1000);
        metrics.put("closingBalance", 850);
        metrics.put("netMovement", -150);
        metrics.put("assignedAssets", 120);
        metrics.put("expendedAssets", 30);
        metrics.put("purchases", 200);
        metrics.put("transferIn", 50);
        metrics.put("transferOut", 100);

        return metrics;
    }
}
