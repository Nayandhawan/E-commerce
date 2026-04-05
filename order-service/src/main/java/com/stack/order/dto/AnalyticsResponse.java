package com.stack.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsResponse {
    private Long currentMonthOrder;
    private Long previousMonthOrder;
    private Long currentMonthEarnings;
    private Long previousMonthEarnings;
    private Long placed;
    private Long shipped;
    private Long delivered;
}
