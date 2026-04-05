package com.stack.order.controller;

import com.stack.order.dto.OrderDto;
import com.stack.order.dto.PlaceOrderDto;
import com.stack.order.service.CartServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/internal/orders")
public class InternalOrderController {

    private final CartServiceImpl cartService;

    public InternalOrderController(CartServiceImpl cartService) {
        this.cartService = cartService;
    }

    // Called by payment-service after successful payment verification
    @PostMapping("/place")
    public ResponseEntity<OrderDto> placeOrder(@RequestBody PlaceOrderDto dto) {
        return ResponseEntity.ok(cartService.placeOrder(dto));
    }
}
