package com.stack.order.controller;

import com.stack.order.dto.AnalyticsResponse;
import com.stack.order.dto.OrderDto;
import com.stack.order.service.AdminOrderServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
    private final AdminOrderServiceImpl adminOrderService;
    public AdminOrderController(AdminOrderServiceImpl adminOrderService) { this.adminOrderService = adminOrderService; }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(adminOrderService.getAllPlacedOrders());
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics() {
        return ResponseEntity.ok(adminOrderService.getAnalytics());
    }

    @GetMapping("/{orderId}/{status}")
    public ResponseEntity<OrderDto> updateStatus(@PathVariable Long orderId, @PathVariable String status) {
        return ResponseEntity.ok(adminOrderService.updateOrderStatus(orderId, status));
    }
}
