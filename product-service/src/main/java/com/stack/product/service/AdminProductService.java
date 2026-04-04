package com.stack.product.service;

import com.stack.product.dto.ProductDto;
import java.io.IOException;
import java.util.List;

public interface AdminProductService {
    ProductDto addProduct(ProductDto dto) throws IOException;
    List<ProductDto> getAllProducts();
    List<ProductDto> getAllProductsByName(String name);
    boolean deleteProductById(Long id);
    ProductDto getProductById(Long id);
    ProductDto updateProduct(Long id, ProductDto dto) throws IOException;
}
