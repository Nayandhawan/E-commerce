package com.stack.ecom.services.admin.adminOrder;

import com.stack.ecom.dto.AnalyticsResponse;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.SalesChartResponse;

import java.util.List;

public interface AdminOrderService {

    List<OrderDto> getAllPlacedOrders();

    OrderDto changeOrderStatus(Long orderId, String status);

    AnalyticsResponse calculateAnalytics();

    byte[] generateSalesReport(String type, int year, Integer month, Integer quarter);

    SalesChartResponse getSalesChart(int fromYear, int toYear);
}
