package com.stack.ecom.entity;

import com.stack.ecom.enums.CouponType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String code;

    private Long discount;

    private Date expirationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'PERCENTAGE'")
    private CouponType couponType = CouponType.PERCENTAGE;

    private Long maxDiscount;

    private Long minOrderAmount;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "coupon_categories",
        joinColumns = @JoinColumn(name = "coupon_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> applicableCategories = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "coupon_products",
        joinColumns = @JoinColumn(name = "coupon_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> applicableProducts = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public Long getDiscount() { return discount; }
    public void setDiscount(Long discount) { this.discount = discount; }
    public Date getExpirationDate() { return expirationDate; }
    public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate; }
    public CouponType getCouponType() { return couponType; }
    public void setCouponType(CouponType couponType) { this.couponType = couponType != null ? couponType : CouponType.PERCENTAGE; }
    public Long getMaxDiscount() { return maxDiscount; }
    public void setMaxDiscount(Long maxDiscount) { this.maxDiscount = maxDiscount; }
    public Long getMinOrderAmount() { return minOrderAmount; }
    public void setMinOrderAmount(Long minOrderAmount) { this.minOrderAmount = minOrderAmount; }
    public List<Category> getApplicableCategories() { return applicableCategories; }
    public void setApplicableCategories(List<Category> applicableCategories) { this.applicableCategories = applicableCategories != null ? applicableCategories : new ArrayList<>(); }
    public List<Product> getApplicableProducts() { return applicableProducts; }
    public void setApplicableProducts(List<Product> applicableProducts) { this.applicableProducts = applicableProducts != null ? applicableProducts : new ArrayList<>(); }
}
