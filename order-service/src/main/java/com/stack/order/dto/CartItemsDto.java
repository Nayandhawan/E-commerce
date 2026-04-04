package com.stack.order.dto;

import lombok.Data;

@Data
public class CartItemsDto {
    private Long id;
    private Long productId;
    private String productName;
    private Long price;
    private Long quantity;
    private Long userId;
}
