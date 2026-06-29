package com.stack.ecom.controller.customer;

import com.stack.ecom.dto.AddProductInCartDto;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.PlaceOrderDto;
import com.stack.ecom.entity.Category;
import com.stack.ecom.entity.Coupon;
import com.stack.ecom.entity.Product;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.CouponRepository;
import com.stack.ecom.services.customer.cart.CartService;
import com.stack.ecom.utils.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional(readOnly = true)
    @GetMapping("/coupons")
    public ResponseEntity<?> getAvailableCoupons() {
        Date now = new Date();
        return ResponseEntity.ok(couponRepository.findAll().stream()
            .filter(c -> c.getExpirationDate() == null || c.getExpirationDate().after(now))
            .map(c -> {
                java.util.Map<String, Object> m = new java.util.HashMap<>();
                m.put("name", c.getName());
                m.put("code", c.getCode());
                m.put("discount", c.getDiscount());
                m.put("couponType", c.getCouponType() != null ? c.getCouponType().name() : "PERCENTAGE");
                m.put("maxDiscount", c.getMaxDiscount());
                m.put("minOrderAmount", c.getMinOrderAmount());
                m.put("applicableCategoryIds", c.getApplicableCategories().stream()
                    .map(Category::getId).collect(java.util.stream.Collectors.toList()));
                m.put("applicableProductIds", c.getApplicableProducts().stream()
                    .map(Product::getId).collect(java.util.stream.Collectors.toList()));
                return m;
            })
            .collect(java.util.stream.Collectors.toList()));
    }

    @PostMapping("/cart")
    public ResponseEntity<?> addProductToCart(@RequestBody AddProductInCartDto addProductInCartDto) {
        addProductInCartDto.setUserId(securityUtils.getCurrentUserId());
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

    @DeleteMapping("/cart/coupon")
    public ResponseEntity<?> removeCoupon() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(cartService.removeCoupon(userId));
    }

    @PutMapping("/cart/increase")
    public ResponseEntity<?> increaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto) {
        addProductInCartDto.setUserId(securityUtils.getCurrentUserId());
        return ResponseEntity.ok(cartService.increaseProductQuantity(addProductInCartDto));
    }

    @PutMapping("/cart/decrease")
    public ResponseEntity<?> decreaseProductQuantity(@RequestBody AddProductInCartDto addProductInCartDto) {
        addProductInCartDto.setUserId(securityUtils.getCurrentUserId());
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
