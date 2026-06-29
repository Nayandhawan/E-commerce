package com.stack.ecom.services.admin.coupon;

import com.stack.ecom.dto.CouponDto;

import java.util.List;

public interface AdminCouponService {

    CouponDto createCoupon(CouponDto couponDto);

    List<CouponDto> getAllCoupons();

    CouponDto updateCoupon(Long id, CouponDto couponDto);

    List<CouponDto> getCouponsByMonthAndYear(int month, int year);

    void deleteCoupon(Long id);
}
