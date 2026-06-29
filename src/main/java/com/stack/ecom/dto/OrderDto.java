package com.stack.ecom.dto;

import com.stack.ecom.enums.OrderStatus;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class OrderDto {

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

    private OrderStatus orderStatus;

    private Long totalAmount;

    private Long discount;

    private UUID trackingId;

    private String returnReason;

    private String userName;

    private List<CartItemsDto> cartItems;

    private String couponName;

    private List<Long> discountedProductIds = new java.util.ArrayList<>();

    private Long eligibleSubtotal;

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<CartItemsDto> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemsDto> cartItems) {
        this.cartItems = cartItems;
    }

    public String getCouponName() {
        return couponName;
    }

    public void setCouponName(String couponName) {
        this.couponName = couponName;
    }

    public List<Long> getDiscountedProductIds() { return discountedProductIds; }
    public void setDiscountedProductIds(List<Long> discountedProductIds) { this.discountedProductIds = discountedProductIds; }
    public Long getEligibleSubtotal() { return eligibleSubtotal; }
    public void setEligibleSubtotal(Long eligibleSubtotal) { this.eligibleSubtotal = eligibleSubtotal; }
}
