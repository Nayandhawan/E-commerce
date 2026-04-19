package com.stack.ecom.controller.customer;


import com.stack.ecom.dto.WishlistDto;
import com.stack.ecom.services.customer.wishlist.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService){
        this.wishlistService = wishlistService;
    }

    @PostMapping("/wishlist/{userId}/{productId}")
    public ResponseEntity<?> addProductToWishlist(@PathVariable Long userId, @PathVariable Long productId){
        WishlistDto wishlistDto = new WishlistDto();
        wishlistDto.setUserId(userId);
        wishlistDto.setProductId(productId);
        WishlistDto postedWishlistDto = wishlistService.addProductToWishlist(wishlistDto);
        if (postedWishlistDto != null && "Product is already in the wishlist".equals(postedWishlistDto.getMessage())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(postedWishlistDto.getMessage());
        }
        else if (postedWishlistDto == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        return ResponseEntity.status(HttpStatus.CREATED).body(postedWishlistDto);
    }

    @DeleteMapping("/wishlist/{userId}/{productId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId){
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/wishlist/{userId}")
    public ResponseEntity<List<WishlistDto>> getWishlistByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(wishlistService.getWishlistByUserId(userId));
    }
}
