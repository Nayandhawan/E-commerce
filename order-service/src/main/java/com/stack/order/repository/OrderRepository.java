package com.stack.order.repository;

import com.stack.order.entity.Order;
import com.stack.order.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUserIdAndOrderStatus(Long userId, OrderStatus status);
    List<Order> findByUserIdAndOrderStatusIn(Long userId, List<OrderStatus> statuses);
    Optional<Order> findByTrackingId(UUID trackingId);
    List<Order> findAllByOrderStatusNot(OrderStatus status);
}
