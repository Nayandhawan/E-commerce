package com.stack.order.service;

import com.stack.order.dto.AnalyticsResponse;
import com.stack.order.dto.OrderDto;
import com.stack.order.entity.Order;
import com.stack.order.enums.OrderStatus;
import com.stack.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
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

    public AnalyticsResponse getAnalytics() {
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();

        cal.set(Calendar.DAY_OF_MONTH, 1); cal.set(Calendar.HOUR_OF_DAY, 0); cal.set(Calendar.MINUTE, 0); cal.set(Calendar.SECOND, 0);
        Date currentMonthStart = cal.getTime();

        cal.add(Calendar.MONTH, -1);
        Date previousMonthStart = cal.getTime();

        cal.add(Calendar.MONTH, 1); cal.add(Calendar.DAY_OF_MONTH, -1); cal.set(Calendar.HOUR_OF_DAY, 23); cal.set(Calendar.MINUTE, 59); cal.set(Calendar.SECOND, 59);
        Date previousMonthEnd = cal.getTime();

        List<Order> allPlaced = orderRepository.findAllByOrderStatusNot(OrderStatus.PENDING);

        long currentMonthOrders = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(currentMonthStart) && !o.getDate().after(now)).count();
        long previousMonthOrders = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(previousMonthStart) && !o.getDate().after(previousMonthEnd)).count();
        long currentMonthEarnings = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(currentMonthStart) && !o.getDate().after(now)).mapToLong(o -> o.getAmount() != null ? o.getAmount() : 0).sum();
        long previousMonthEarnings = allPlaced.stream().filter(o -> o.getDate() != null && !o.getDate().before(previousMonthStart) && !o.getDate().after(previousMonthEnd)).mapToLong(o -> o.getAmount() != null ? o.getAmount() : 0).sum();

        long placed   = allPlaced.stream().filter(o -> o.getOrderStatus() == OrderStatus.PLACED).count();
        long shipped  = allPlaced.stream().filter(o -> o.getOrderStatus() == OrderStatus.SHIPPED).count();
        long delivered= allPlaced.stream().filter(o -> o.getOrderStatus() == OrderStatus.DELIVERED).count();

        return new AnalyticsResponse(currentMonthOrders, previousMonthOrders, currentMonthEarnings, previousMonthEarnings, placed, shipped, delivered);
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
