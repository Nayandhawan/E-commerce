package com.stack.order.service;

import com.stack.order.dto.OrderDto;
import com.stack.order.entity.Order;
import com.stack.order.enums.OrderStatus;
import com.stack.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminOrderServiceImpl {

    private final OrderRepository orderRepository;

    public AdminOrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderDto> getAllPlacedOrders() {
        return orderRepository.findAllByOrderStatusNot(OrderStatus.PENDING)
                .stream().map(this::toDto).toList();
    }

    public OrderDto updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setOrderStatus(OrderStatus.valueOf(status.toUpperCase()));
        return toDto(orderRepository.save(order));
    }

    private OrderDto toDto(Order o) {
        OrderDto dto = new OrderDto();
        dto.setId(o.getId()); dto.setOrderDescription(o.getOrderDescription());
        dto.setAddress(o.getAddress()); dto.setDate(o.getDate());
        dto.setAmount(o.getAmount()); dto.setOrderStatus(o.getOrderStatus());
        dto.setTrackingId(o.getTrackingId()); dto.setUserName("User #" + o.getUserId());
        if (o.getCoupon() != null) dto.setCouponName(o.getCoupon().getName());
        return dto;
    }
}
