package com.stack.ecom.services.admin.adminproduct;

import com.stack.ecom.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface AdminProductService {

    ProductDto addProduct(ProductDto productDto) throws IOException;

    List<ProductDto> getAllProducts();

    List<ProductDto> getAllProductsByName(String name);

    boolean deleteProductById(Long id);

    ProductDto getProductById(Long productId);

    ProductDto updateProduct(Long productId, ProductDto productDto) throws IOException;

    List<Map<String, Object>> addProductImage(Long productId, MultipartFile file) throws IOException;

    List<Map<String, Object>> getProductImages(Long productId);

    boolean deleteProductImage(Long productId, Long imageId);
}
