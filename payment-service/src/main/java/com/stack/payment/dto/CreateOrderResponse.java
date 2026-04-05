package com.stack.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateOrderResponse {
    private String razorpayOrderId;
    private Long amount;
    private String currency;
    private String keyId;
}
