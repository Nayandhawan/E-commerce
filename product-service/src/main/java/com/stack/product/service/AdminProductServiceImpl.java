package com.stack.product.service;

import com.stack.product.dto.ProductDto;
import com.stack.product.entity.Category;
import com.stack.product.entity.Product;
import com.stack.product.repository.CategoryRepository;
import com.stack.product.repository.ProductRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public AdminProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductDto addProduct(ProductDto dto) throws IOException {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImg(dto.getImg().getBytes());
        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow();
        product.setCategory(category);
        return toDto(productRepository.save(product));
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public List<ProductDto> getAllProductsByName(String name) {
        return productRepository.findAllByNameContaining(name).stream().map(this::toDto).toList();
    }

    @Override
    @CacheEvict(value = "products", key = "#id")
    public boolean deleteProductById(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ProductDto getProductById(Long id) {
        return productRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    @CacheEvict(value = "products", key = "#id")
    public ProductDto updateProduct(Long id, ProductDto dto) throws IOException {
        Optional<Product> optProduct = productRepository.findById(id);
        Optional<Category> optCategory = categoryRepository.findById(dto.getCategoryId());
        if (optProduct.isPresent() && optCategory.isPresent()) {
            Product product = optProduct.get();
            product.setName(dto.getName());
            product.setPrice(dto.getPrice());
            product.setDescription(dto.getDescription());
            product.setCategory(optCategory.get());
            if (dto.getImg() != null) {
                product.setImg(dto.getImg().getBytes());
            }
            return toDto(productRepository.save(product));
        }
        return null;
    }

    private ProductDto toDto(Product p) {
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
