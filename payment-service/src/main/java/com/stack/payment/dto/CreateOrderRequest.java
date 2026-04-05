package com.stack.payment.dto;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private Long amount;   // in paise (INR * 100)
    private Long userId;
}
