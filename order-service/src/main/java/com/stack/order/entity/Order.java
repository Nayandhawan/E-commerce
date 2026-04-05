package com.stack.order.entity;

import com.stack.order.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderDescription;
    private Date date;
    private Long amount;
    private String address;
    private String payment;
    @Enumerated(EnumType.ORDINAL)
    private OrderStatus orderStatus;
    private Long totalAmount;
    private Long discount;
    private UUID trackingId;
    private Long userId;
    private String razorpayPaymentId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "order")
    private List<CartItems> cartItems;
}
