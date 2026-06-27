package com.stack.ecom.controller.customer;

import com.stack.ecom.dto.AddProductInCartDto;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.PlaceOrderDto;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.CouponRepository;
import com.stack.ecom.services.customer.cart.CartService;
import com.stack.ecom.utils.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CartController {

    private final CartService cartService;
    private final CouponRepository couponRepository;
    private final SecurityUtils securityUtils;

    public CartController(CartService cartService, CouponRepository couponRepository, SecurityUtils securityUtils) {
        this.cartService = cartService;
        this.couponRepository = couponRepository;
        this.securityUtils = securityUtils;
    }

    @GetMapping("/coupons")
    public ResponseEntity<?> getAvailableCoupons() {
        Date now = new Date();
        return ResponseEntity.ok(couponRepository.findAll().stream()
            .filter(c -> c.getExpirationDate() == null || c.getExpirationDate().after(now))
            .map(c -> Map.of("name", c.getName(), "code", c.getCode(), "discount", c.getDiscount()))
            .toList());
    }

    @PostMapping("/cart")
    public ResponseEntity<?> addProductToCart(@RequestBody AddProductInCartDto addProductInCartDto) {
        return cartService.addProductToCart(addProductInCartDto);
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<?> getProductFromCart(@PathVariable Long userId) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        OrderDto orderDto = cartService.getCartByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(orderDto);
    }

    @PostMapping("/cart/{userId}/coupon")
    public ResponseEntity<?> applyCoupon(@PathVariable Long userId, @RequestParam String code) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        try {
            OrderDto orderDto = cartService.applyCoupon(userId, code);
            return ResponseEntity.ok(orderDto);
        } catch (ValidationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/cart/increase")
    public ResponseEntity<?> increaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto) {
        return ResponseEntity.ok(cartService.increaseProductQuantity(addProductInCartDto));
    }

    @PutMapping("/cart/decrease")
    public ResponseEntity<?> decreaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto) {
        return ResponseEntity.ok(cartService.decreaseProductQuantity(addProductInCartDto));
    }

    @PostMapping("/cart/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDto placeOrderDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.placeOrder(placeOrderDto));
    }

    @GetMapping("/cart/{userId}/orders")
    public ResponseEntity<List<OrderDto>> getMyPlacedOrder(@PathVariable Long userId) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        return ResponseEntity.ok(cartService.getPlacedOrder(userId));
    }

    @DeleteMapping("/cart/{userId}/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        return ResponseEntity.ok(cartService.removeFromCart(userId, productId));
    }

    @PatchMapping("/cart/order/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId, @RequestParam Long userId) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        return cartService.cancelOrder(userId, orderId);
    }

    @PatchMapping("/cart/order/{orderId}/return")
    public ResponseEntity<?> requestReturn(@PathVariable Long orderId, @RequestParam Long userId,
                                            @RequestParam String reason) {
        if (!securityUtils.isCurrentUser(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        return cartService.requestReturn(userId, orderId, reason);
    }
}
