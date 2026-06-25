package com.stack.ecom.dto;

import lombok.Data;

@Data
public class PlaceOrderDto {

    private Long userId;
    private String address;
    private String orderDescription;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOrderDescription() {
        return orderDescription;
    }

    public void setOrderDescription(String orderDescription) {
        this.orderDescription = orderDescription;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) { this.address = address; }
    public String getStreet() { return street; }
    public void setStreet(String s) { this.street = s; }
    public String getCity() { return city; }
    public void setCity(String s) { this.city = s; }
    public String getState() { return state; }
    public void setState(String s) { this.state = s; }
    public String getZipCode() { return zipCode; }
    public void setZipCode(String s) { this.zipCode = s; }
    public String getCountry() { return country; }
    public void setCountry(String s) { this.country = s; }
}
