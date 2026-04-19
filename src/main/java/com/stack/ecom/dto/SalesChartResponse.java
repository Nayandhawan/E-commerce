package com.stack.ecom.dto;

import java.util.List;

public class SalesChartResponse {

    private List<String> labels;
    private List<Long> amounts;

    public SalesChartResponse(List<String> labels, List<Long> amounts) {
        this.labels = labels;
        this.amounts = amounts;
    }

    public List<String> getLabels() { return labels; }
    public List<Long> getAmounts() { return amounts; }
}
