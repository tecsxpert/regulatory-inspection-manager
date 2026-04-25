package com.internship.tool.controller;

import com.internship.tool.entity.User;
import com.internship.tool.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        String response = authService.register(user);

        if (response.equals("User already exists")) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        System.out.println("LOGIN API HIT"); // 🔥 debug

        String response = authService.login(user);

        if (response.equals("User not found")) {
            return ResponseEntity.status(404).body(response);
        }

        if (response.equals("Invalid password")) {
            return ResponseEntity.status(401).body(response);
        }

        return ResponseEntity.ok(response); // ✅ JWT token
    }
}