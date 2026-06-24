package com.stack.ecom.repository;

import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.entity.Order;
import com.stack.ecom.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);

    List<Order> findAllByOrderStatusIn(List<OrderStatus> orderStatusList);

    List<Order> findByUserIdAndOrderStatusIn(Long userId, List<OrderStatus> orderStatus);

    Optional<Order> findByTrackingId(UUID trackingId);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    List<Order> findByDateBetweenAndOrderStatus(Date startOfMonth, Date endOfMonth, OrderStatus status);

    List<Order> findByDateBetweenAndOrderStatusIn(Date start, Date end, List<OrderStatus> statuses);

    Long countByOrderStatus(OrderStatus orderStatus);

}
