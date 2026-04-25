package com.internship.tool.service;

import com.internship.tool.entity.User;
import com.internship.tool.repository.UserRepository;
import com.internship.tool.security.JwtUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       JwtUtil jwtUtil,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER
    public String register(User user) {

        Optional<User> existing = userRepository.findByUsername(user.getUsername());

        if (existing.isPresent()) {
            return "User already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN
    public String login(User user) {

    Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

    if (existingUser.isEmpty()) {
        return "User not found";
    }

    String dbPassword = existingUser.get().getPassword();

    System.out.println("------ LOGIN DEBUG ------");
    System.out.println("Entered Password: " + user.getPassword());
    System.out.println("DB Password: " + dbPassword);

    boolean match = passwordEncoder.matches(user.getPassword(), dbPassword);

    System.out.println("MATCH RESULT: " + match);
    System.out.println("--------------------------");

    if (!match) {
        return "Invalid password";
    }

    return jwtUtil.generateToken(user.getUsername());
}
}
