package com.stack.ecom.controller.admin;

import com.stack.ecom.dto.AnalyticsResponse;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.SalesChartResponse;
import com.stack.ecom.services.admin.adminOrder.AdminOrderService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    public AdminOrderController(AdminOrderService adminOrderService){
        this.adminOrderService = adminOrderService;
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getAllPlacedOrders(){
        return ResponseEntity.ok(adminOrderService.getAllPlacedOrders());
    }

    @GetMapping("/orders/{orderId}/{status}")
    public ResponseEntity<?> changeOrderStatus(@PathVariable Long orderId, @PathVariable String status){
        OrderDto orderDto = adminOrderService.changeOrderStatus(orderId,status);
        if (orderDto == null){
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.OK).body(orderDto);
    }

    @GetMapping("/orders/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics(){
        return ResponseEntity.ok(adminOrderService.calculateAnalytics());
    }

    @GetMapping("/sales-chart")
    public ResponseEntity<SalesChartResponse> getSalesChart(
            @RequestParam int fromYear,
            @RequestParam int toYear) {
        return ResponseEntity.ok(adminOrderService.getSalesChart(fromYear, toYear));
    }

    @PatchMapping("/orders/{orderId}/return")
    public ResponseEntity<?> processReturn(@PathVariable Long orderId, @RequestParam String action) {
        OrderDto orderDto = adminOrderService.processReturn(orderId, action);
        if (orderDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot process return for this order");
        }
        return ResponseEntity.ok(orderDto);
    }

    @GetMapping("/sales-report")
    public ResponseEntity<byte[]> getSalesReport(
            @RequestParam String type,
            @RequestParam int year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer quarter
    ) {
        byte[] excel = adminOrderService.generateSalesReport(type, year, month, quarter);
        String filename = "sales-report-" + type.toLowerCase() + "-" + year + ".xlsx";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excel);
    }
}
