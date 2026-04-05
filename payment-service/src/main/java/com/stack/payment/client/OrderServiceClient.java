package com.stack.payment.client;

import com.stack.payment.dto.PlaceOrderDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "order-service")
public interface OrderServiceClient {

    @PostMapping("/api/internal/orders/place")
    Object placeOrder(@RequestBody PlaceOrderDto dto);
}
