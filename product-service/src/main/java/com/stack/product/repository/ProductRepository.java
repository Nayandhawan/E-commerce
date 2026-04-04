package com.stack.product.repository;

import com.stack.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByNameContaining(String name);
    List<Product> findAllByCategoryId(Long categoryId);
}
