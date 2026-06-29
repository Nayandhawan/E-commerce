package com.stack.ecom.dto;

import com.stack.ecom.enums.CouponType;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class CouponDto {

    private Long id;
    private String name;
    private String code;
    private Long discount;
    private Date expirationDate;
    private CouponType couponType = CouponType.PERCENTAGE;
    private Long maxDiscount;
    private Long minOrderAmount;
    private List<Long> applicableCategoryIds = new ArrayList<>();
    private List<Long> applicableProductIds = new ArrayList<>();

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
    public void setCouponType(CouponType couponType) { this.couponType = couponType; }
    public Long getMaxDiscount() { return maxDiscount; }
    public void setMaxDiscount(Long maxDiscount) { this.maxDiscount = maxDiscount; }
    public Long getMinOrderAmount() { return minOrderAmount; }
    public void setMinOrderAmount(Long minOrderAmount) { this.minOrderAmount = minOrderAmount; }
    public List<Long> getApplicableCategoryIds() { return applicableCategoryIds; }
    public void setApplicableCategoryIds(List<Long> applicableCategoryIds) { this.applicableCategoryIds = applicableCategoryIds != null ? applicableCategoryIds : new ArrayList<>(); }
    public List<Long> getApplicableProductIds() { return applicableProductIds; }
    public void setApplicableProductIds(List<Long> applicableProductIds) { this.applicableProductIds = applicableProductIds != null ? applicableProductIds : new ArrayList<>(); }
}
