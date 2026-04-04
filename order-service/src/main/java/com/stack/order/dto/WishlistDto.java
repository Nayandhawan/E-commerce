package com.stack.order.dto;

import lombok.Data;

@Data
public class WishlistDto {
    private Long id;
    private Long productId;
    private String productName;
    private String productDescription;
    private Long price;
    private Long userId;
}
