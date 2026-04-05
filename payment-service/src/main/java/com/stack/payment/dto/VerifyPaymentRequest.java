package com.stack.payment.dto;

import lombok.Data;

@Data
public class VerifyPaymentRequest {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    // Order details to place after payment
    private Long userId;
    private String address;
    private String orderDescription;
}
