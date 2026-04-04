package com.stack.ecom.dto;

import lombok.Data;

@Data
public class AnalyticsResponse {

    private Long placed;

    private Long shipped;

    private Long delivered;

    private Long currentMonthOrder;

    private Long previousMonthOrder;

    private Long currentMonthEarnings;

    private Long previousMonthEarnings;


    // Constructor with arguments
    public AnalyticsResponse(Long placed,Long shipped, Long delivered, Long currentMonthOrder,Long previousMonthOrder, Long currentMonthEarnings, Long previousMonthEarnings) {
        this.placed = placed;
        this.shipped = shipped;
        this.delivered = delivered;
        this.currentMonthOrder = currentMonthOrder;
        this.previousMonthOrder = previousMonthOrder;
        this.currentMonthEarnings = currentMonthEarnings;
        this.previousMonthEarnings = previousMonthEarnings;
    }

}
