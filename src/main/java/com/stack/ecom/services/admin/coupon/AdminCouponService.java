package com.stack.ecom.services.admin.coupon;

import com.stack.ecom.entity.Coupon;

import java.util.List;

public interface AdminCouponService {

    Coupon createCoupon(Coupon coupon);

    List<Coupon> getAllCoupons();

    Coupon updateCoupon(Long id, Coupon coupon);

    List<Coupon> getCouponsByMonthAndYear(int month, int year);

    void deleteCoupon(Long id);

}
