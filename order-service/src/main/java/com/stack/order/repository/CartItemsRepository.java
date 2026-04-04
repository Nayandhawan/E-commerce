package com.stack.order.repository;

import com.stack.order.entity.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    Optional<CartItems> findByProductIdAndOrderIdAndUserId(Long productId, Long orderId, Long userId);
}
