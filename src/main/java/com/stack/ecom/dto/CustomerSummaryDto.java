package com.stack.ecom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSummaryDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String city;
    private long orderCount;
    private long totalSpent;
}
