package com.stack.order.controller;

import com.stack.order.dto.WishlistDto;
import com.stack.order.service.WishlistServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customer/wishlist")
public class WishlistController {
    private final WishlistServiceImpl wishlistService;
    public WishlistController(WishlistServiceImpl wishlistService) { this.wishlistService = wishlistService; }

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<WishlistDto> add(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, productId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistDto>> get(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlistByUser(userId));
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<Void> remove(@PathVariable Long userId, @PathVariable Long productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
