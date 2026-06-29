package com.stack.ecom.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stack.ecom.dto.CartItemsDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(name = "cart_items", indexes = {
    @Index(name = "idx_cart_user_order", columnList = "user_id,order_id"),
    @Index(name = "idx_cart_product_order_user", columnList = "product_id,order_id,user_id")
})
public class CartItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long price;

    private Long quantity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public CartItemsDto cartItemsDto(){
        CartItemsDto cartItemsDto = new CartItemsDto();
        cartItemsDto.setId(getId());
        cartItemsDto.setPrice(getPrice());
        cartItemsDto.setProductId(getProduct().getId());
        cartItemsDto.setQuantity(getQuantity());
        cartItemsDto.setUserId(getUser().getId());
        cartItemsDto.setProductName(getProduct().getName());
        if (getProduct().getImgPath() != null) {
            cartItemsDto.setImgUrl(getProduct().getImgPath());
        } else {
            cartItemsDto.setReturnedImg(getProduct().getImg());
        }
        if (getProduct().getCategory() != null) {
            cartItemsDto.setCategoryId(getProduct().getCategory().getId());
        }

        return cartItemsDto;
    }
}
