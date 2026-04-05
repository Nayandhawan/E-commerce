package com.stack.product.controller;

import com.stack.product.dto.ProductPriceDto;
import com.stack.product.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/internal/products")
public class InternalProductController {

    private final ProductRepository productRepository;

    public InternalProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Called by order-service via Feign — no auth check, internal traffic only
    @GetMapping("/{id}")
    public ResponseEntity<ProductPriceDto> getProductPrice(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(p -> ResponseEntity.ok(new ProductPriceDto(p.getId(), p.getPrice(), p.getName(), true, p.getImg())))
                .orElse(ResponseEntity.ok(new ProductPriceDto(id, 0L, "Unknown", false, null)));
    }
}
