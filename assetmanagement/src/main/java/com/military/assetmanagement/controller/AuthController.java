package com.military.assetmanagement.controller;

import com.military.assetmanagement.dto.RegisterRequest;
import com.military.assetmanagement.entity.Role;
import com.military.assetmanagement.entity.User;
import com.military.assetmanagement.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Map<String, String> registerUser(@RequestBody RegisterRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                response.put("error", "Email already in use!");
                return response;
            }

            User user = new User();
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.valueOf(request.getRole().trim().toUpperCase())); 

            userRepository.save(user);

            response.put("message", "User registered successfully!");
            return response;
        } catch (Exception e) {
            e.printStackTrace(); 
            response.put("error", "Internal server error: " + e.getMessage());
            return response;
        }
    }
    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = request.get("email");
            String password = request.get("password");

            if (email == null || password == null) {
                response.put("error", "Email and password are required");
                return response;
            }

            User user = userRepository.findByEmail(email)
                    .orElse(null);

            if (user == null) {
                response.put("error", "User not found");
                return response;
            }

            if (!passwordEncoder.matches(password, user.getPassword())) {
                response.put("error", "Invalid credentials");
                return response;
            }

            
            Map<String, Object> userData = new HashMap<>();
            userData.put("fullName", user.getFullName());
            userData.put("email", user.getEmail());
            userData.put("role", user.getRole().name());

            return userData;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Internal server error: " + e.getMessage());
            return response;
        }
    }



}
