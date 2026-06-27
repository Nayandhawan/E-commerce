package com.stack.ecom.services.customer;


import com.stack.ecom.dto.ProductDetailDto;
import com.stack.ecom.dto.ProductDto;

import java.util.List;

public interface CustomerProductService {

    List<ProductDto> searchProductByTitle(String title);

    List<ProductDto> getAllProducts();

    ProductDetailDto getProductDetailById(Long productId);

    List<ProductDto> getRelatedProducts(String categoryName, Long excludeId);
}
