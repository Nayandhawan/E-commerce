package com.stack.ecom.repository;

import com.stack.ecom.entity.Order;
import com.stack.ecom.enums.OrderStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    Order findFirstByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);

    // Loads order + cart items + their products + user + coupon in minimal queries
    @EntityGraph(attributePaths = {"cartItems", "cartItems.product", "cartItems.product.category", "cartItems.user", "coupon"})
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.orderStatus = :status ORDER BY o.id DESC")
    List<Order> findByUserIdAndOrderStatusWithItems(@Param("userId") Long userId, @Param("status") OrderStatus status);

    List<Order> findAllByOrderStatusIn(List<OrderStatus> orderStatusList);

    List<Order> findByUserIdAndOrderStatusIn(Long userId, List<OrderStatus> orderStatus);

    Optional<Order> findByTrackingId(UUID trackingId);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    List<Order> findByDateBetweenAndOrderStatus(Date startOfMonth, Date endOfMonth, OrderStatus status);

    List<Order> findByDateBetweenAndOrderStatusIn(Date start, Date end, List<OrderStatus> statuses);

    // JOIN FETCH cart items + products for sales report (avoids N+1 on product names)
    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.cartItems ci LEFT JOIN FETCH ci.product WHERE o.date BETWEEN :start AND :end AND o.orderStatus IN :statuses")
    List<Order> findByDateRangeAndStatusesWithItems(@Param("start") Date start, @Param("end") Date end, @Param("statuses") List<OrderStatus> statuses);

    Long countByOrderStatus(OrderStatus orderStatus);

    // Aggregate analytics — replaces 3 separate countByOrderStatus calls
    @Query("SELECT o.orderStatus, COUNT(o) FROM Order o WHERE o.orderStatus IN :statuses GROUP BY o.orderStatus")
    List<Object[]> countGroupedByStatus(@Param("statuses") List<OrderStatus> statuses);

    // Aggregate date-range queries — replaces loading full Order objects just to count/sum
    @Query("SELECT COUNT(o) FROM Order o WHERE o.date BETWEEN :start AND :end AND o.orderStatus = :status")
    Long countByDateRangeAndStatus(@Param("start") Date start, @Param("end") Date end, @Param("status") OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.amount), 0) FROM Order o WHERE o.date BETWEEN :start AND :end AND o.orderStatus = :status")
    Long sumAmountByDateRangeAndStatus(@Param("start") Date start, @Param("end") Date end, @Param("status") OrderStatus status);

}
