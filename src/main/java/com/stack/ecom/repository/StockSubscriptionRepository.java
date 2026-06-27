package com.stack.ecom.repository;

import com.stack.ecom.entity.StockSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockSubscriptionRepository extends JpaRepository<StockSubscription, Long> {
    List<StockSubscription> findByProductId(Long productId);
    Optional<StockSubscription> findByUserIdAndProductId(Long userId, Long productId);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
