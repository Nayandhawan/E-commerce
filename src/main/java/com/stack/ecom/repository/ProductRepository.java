package com.stack.ecom.repository;

import com.stack.ecom.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN FETCH p.category")
    List<Product> findAllWithCategory();

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.name LIKE %:name%")
    List<Product> findAllByNameContainingWithCategory(@Param("name") String name);

    List<Product> findAllByNameContaining(String title);

    List<Product> findByCategoryNameIgnoreCaseAndIdNot(String categoryName, Long excludeId);
}
