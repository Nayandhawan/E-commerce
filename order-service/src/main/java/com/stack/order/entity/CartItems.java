package com.stack.order.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CartItems {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long price;
    private Long quantity;
    private Long productId;
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
}
