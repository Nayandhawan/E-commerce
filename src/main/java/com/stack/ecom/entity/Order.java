package com.stack.ecom.entity;

import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String orderDescription;

    private Date date;

    private Long amount;

    private String address;

    private String deliveryStreet;
    private String deliveryCity;
    private String deliveryState;
    private String deliveryZipCode;
    private String deliveryCountry;

    private String payment;

    @Enumerated(EnumType.ORDINAL)
    private OrderStatus orderStatus;

    private Long totalAmount;

    private Long discount;

    private UUID trackingId;

    private String returnReason;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id" , referencedColumnName = "id")
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "coupon_id" , referencedColumnName = "id")
    private Coupon coupon;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "order")
    private List<CartItems> cartItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderDescription() {
        return orderDescription;
    }

    public void setOrderDescription(String orderDescription) {
        this.orderDescription = orderDescription;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDeliveryStreet() { return deliveryStreet; }
    public void setDeliveryStreet(String s) { this.deliveryStreet = s; }
    public String getDeliveryCity() { return deliveryCity; }
    public void setDeliveryCity(String s) { this.deliveryCity = s; }
    public String getDeliveryState() { return deliveryState; }
    public void setDeliveryState(String s) { this.deliveryState = s; }
    public String getDeliveryZipCode() { return deliveryZipCode; }
    public void setDeliveryZipCode(String s) { this.deliveryZipCode = s; }
    public String getDeliveryCountry() { return deliveryCountry; }
    public void setDeliveryCountry(String s) { this.deliveryCountry = s; }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getDiscount() {
        return discount;
    }

    public void setDiscount(Long discount) {
        this.discount = discount;
    }

    public UUID getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(UUID trackingId) {
        this.trackingId = trackingId;
    }

    public String getReturnReason() {
        return returnReason;
    }

    public void setReturnReason(String returnReason) {
        this.returnReason = returnReason;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }

    public List<CartItems> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItems> cartItems) {
        this.cartItems = cartItems;
    }

    public OrderDto getOrderDto(){
        OrderDto orderDto = new OrderDto();
        orderDto.setId(id);
        orderDto.setOrderDescription(orderDescription);
        orderDto.setAddress(address);
        orderDto.setTrackingId(trackingId);
        orderDto.setAmount(amount);
        orderDto.setDate(date);
        orderDto.setOrderStatus(orderStatus);
        orderDto.setReturnReason(returnReason);
        orderDto.setDeliveryStreet(deliveryStreet);
        orderDto.setDeliveryCity(deliveryCity);
        orderDto.setDeliveryState(deliveryState);
        orderDto.setDeliveryZipCode(deliveryZipCode);
        orderDto.setDeliveryCountry(deliveryCountry);
        orderDto.setUserName(user.getName());
        if (coupon !=null){
            orderDto.setCouponName(coupon.getName());
        }
        return orderDto;
    }
}
