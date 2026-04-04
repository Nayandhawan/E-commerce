package com.stack.order.controller;

import com.stack.order.dto.*;
import com.stack.order.service.CartServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/customer/cart")
public class CartController {
    private final CartServiceImpl cartService;
    public CartController(CartServiceImpl cartService) { this.cartService = cartService; }

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody AddProductInCartDto dto) {
        return cartService.addProductToCart(dto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<OrderDto> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/{userId}/coupon")
    public ResponseEntity<OrderDto> applyCoupon(@PathVariable Long userId, @RequestParam String code) {
        return ResponseEntity.ok(cartService.applyCoupon(userId, code));
    }

    @PutMapping("/increase")
    public ResponseEntity<OrderDto> increase(@RequestBody AddProductInCartDto dto) {
        return ResponseEntity.ok(cartService.increaseProductQuantity(dto));
    }

    @PutMapping("/decrease")
    public ResponseEntity<OrderDto> decrease(@RequestBody AddProductInCartDto dto) {
        return ResponseEntity.ok(cartService.decreaseProductQuantity(dto));
    }

    @PostMapping("/place-order")
    public ResponseEntity<OrderDto> placeOrder(@RequestBody PlaceOrderDto dto) {
        return ResponseEntity.ok(cartService.placeOrder(dto));
    }

    @GetMapping("/{userId}/orders")
    public ResponseEntity<List<OrderDto>> getPlacedOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getPlacedOrders(userId));
    }

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<OrderDto> track(@PathVariable UUID trackingId) {
        OrderDto dto = cartService.searchByTrackingId(trackingId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }
}
