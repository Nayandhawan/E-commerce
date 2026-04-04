package com.stack.order.client;

import com.stack.order.dto.ProductPriceDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", path = "/api/internal/products")
public interface ProductServiceClient {
    @GetMapping("/{id}")
    ProductPriceDto getProduct(@PathVariable Long id);
}
