package com.stack.order.dto;

import lombok.Data;

@Data
public class ProductPriceDto {
    private Long id;
    private Long price;
    private String name;
    private boolean exists;
    private byte[] img;
}
