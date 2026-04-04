package com.stack.product.service;

import com.stack.product.dto.ProductDto;
import com.stack.product.repository.ProductRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerProductServiceImpl implements CustomerProductService {

    private final ProductRepository productRepository;

    public CustomerProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        return productRepository.findAllByCategoryId(categoryId).stream().map(this::toDto).toList();
    }

    @Override
    public List<ProductDto> searchByName(String name) {
        return productRepository.findAllByNameContaining(name).stream().map(this::toDto).toList();
    }

    @Override
    @Cacheable(value = "products", key = "#id")
    public ProductDto getProductById(Long id) {
        return productRepository.findById(id).map(this::toDto).orElse(null);
    }

    private ProductDto toDto(com.stack.product.entity.Product p) {
        ProductDto dto = new ProductDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setPrice(p.getPrice());
        dto.setDescription(p.getDescription());
        dto.setByteImg(p.getImg());
        dto.setCategoryId(p.getCategory().getId());
        dto.setCategoryName(p.getCategory().getName());
        return dto;
    }
}
