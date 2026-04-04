package com.stack.order.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Wishlist {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long productId;
    private Long userId;
}
