package com.stack.product.service;

import com.stack.product.dto.ProductDto;
import java.util.List;

public interface CustomerProductService {
    List<ProductDto> getAllProducts();
    List<ProductDto> getProductsByCategory(Long categoryId);
    List<ProductDto> searchByName(String name);
    ProductDto getProductById(Long id);
}
