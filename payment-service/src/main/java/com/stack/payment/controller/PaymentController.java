package com.stack.payment.controller;

import com.stack.payment.dto.CreateOrderRequest;
import com.stack.payment.dto.CreateOrderResponse;
import com.stack.payment.dto.VerifyPaymentRequest;
import com.stack.payment.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<CreateOrderResponse> createOrder(@RequestBody CreateOrderRequest request) throws Exception {
        return ResponseEntity.ok(paymentService.createOrder(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<Object> verifyPayment(@RequestBody VerifyPaymentRequest request) throws Exception {
        return ResponseEntity.ok(paymentService.verifyAndPlace(request));
    }
}
