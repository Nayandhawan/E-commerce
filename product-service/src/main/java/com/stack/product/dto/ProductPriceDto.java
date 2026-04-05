package com.stack.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPriceDto {
    private Long id;
    private Long price;
    private String name;
    private boolean exists;
    private byte[] img;
}
