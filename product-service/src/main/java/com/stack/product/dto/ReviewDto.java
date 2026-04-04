package com.stack.product.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private Long rating;
    private String description;
    private Long productId;
    private Long userId;
}
