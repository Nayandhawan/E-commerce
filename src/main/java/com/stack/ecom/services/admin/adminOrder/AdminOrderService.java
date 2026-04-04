package com.stack.ecom.services.admin.adminOrder;

import com.stack.ecom.dto.AnalyticsResponse;
import com.stack.ecom.dto.OrderDto;

import java.util.List;

public interface AdminOrderService {

    List<OrderDto> getAllPlacedOrders();

    OrderDto changeOrderStatus(Long orderId, String status);

    AnalyticsResponse calculateAnalytics();
}
