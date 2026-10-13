package com.atsskill.certification.service;

import com.atsskill.certification.dto.*;
import com.atsskill.certification.exception.BadRequestException;
import com.atsskill.certification.exception.ConflictException;
import com.atsskill.certification.exception.ResourceNotFoundException;
import com.atsskill.certification.model.Role;
import com.atsskill.certification.model.User;
import com.atsskill.certification.repository.UserRepository;
import com.atsskill.certification.security.JwtTokenProvider;
import com.atsskill.certification.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Password and confirmation password do not match");
        }

        String normalizedEmail = request.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ConflictException("Email is already registered. Please login instead.");
        }

        User user = new User(
                request.getFullName().trim(),
                normalizedEmail,
                passwordEncoder.encode(request.getPassword()),
                Role.STUDENT
        );
        user.setAcademicBranch(request.getAcademicBranch() != null ? request.getAcademicBranch() : "B.Tech");
        user.setEmailVerified(true);
        user.setActive(true);
        user.setCreatedAt(Instant.now());
        User savedUser = userRepository.save(user);

        UserPrincipal userPrincipal = UserPrincipal.create(savedUser);
        String token = tokenProvider.generateToken(userPrincipal);
        String refreshToken = tokenProvider.generateRefreshToken(userPrincipal);

        return new AuthResponse(token, refreshToken, savedUser.getId(), savedUser.getFullName(), savedUser.getEmail(), savedUser.getRole(), savedUser.getAcademicBranch());
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().toLowerCase().trim();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        String token = tokenProvider.generateToken(userPrincipal);
        String refreshToken = tokenProvider.generateRefreshToken(userPrincipal);

        return new AuthResponse(token, refreshToken, userPrincipal.getId(), userPrincipal.getFullName(), userPrincipal.getUsername(), userPrincipal.getRole(), userPrincipal.getAcademicBranch());
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new BadRequestException("Invalid or expired refresh token");
        }

        String email = tokenProvider.getEmailFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        String newToken = tokenProvider.generateToken(userPrincipal);
        String newRefreshToken = tokenProvider.generateRefreshToken(userPrincipal);

        return new AuthResponse(newToken, newRefreshToken, user.getId(), user.getFullName(), user.getEmail(), user.getRole(), user.getAcademicBranch());
    }

    public UserProfileResponse getCurrentUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole(), user.getAcademicBranch(), user.isEmailVerified(), user.getCreatedAt());
    }
}
