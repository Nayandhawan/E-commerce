package com.stack.ecom.controller.customer;

import com.stack.ecom.dto.ProfileDto;
import com.stack.ecom.services.customer.profile.CustomerProfileService;
import com.stack.ecom.utils.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerProfileController {

    private final CustomerProfileService customerProfileService;
    private final SecurityUtils securityUtils;

    public CustomerProfileController(CustomerProfileService customerProfileService, SecurityUtils securityUtils) {
        this.customerProfileService = customerProfileService;
        this.securityUtils = securityUtils;
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        ProfileDto profile = customerProfileService.getProfile(userId);
        if (profile == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @RequestBody ProfileDto dto) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        ProfileDto updated = customerProfileService.updateProfile(userId, dto);
        if (updated == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        return ResponseEntity.ok(updated);
    }
}
