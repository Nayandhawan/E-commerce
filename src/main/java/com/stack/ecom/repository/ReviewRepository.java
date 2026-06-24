package com.stack.ecom.repository;

import com.stack.ecom.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findAllByProductId(Long productId);

    @Query("SELECT r.product.id, AVG(r.rating) FROM Review r GROUP BY r.product.id")
    List<Object[]> findAverageRatingsPerProduct();
}
