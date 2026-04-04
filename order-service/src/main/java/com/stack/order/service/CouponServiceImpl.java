package com.stack.order.service;

import com.stack.order.dto.CouponDto;
import com.stack.order.entity.Coupon;
import com.stack.order.repository.CouponRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CouponServiceImpl {
    private final CouponRepository couponRepository;
    public CouponServiceImpl(CouponRepository couponRepository) { this.couponRepository = couponRepository; }

    public CouponDto createCoupon(CouponDto dto) {
        Coupon c = new Coupon();
        c.setName(dto.getName()); c.setCode(dto.getCode());
        c.setDiscount(dto.getDiscount()); c.setExpirationDate(dto.getExpirationDate());
        return toDto(couponRepository.save(c));
    }

    public List<CouponDto> getAllCoupons() {
        return couponRepository.findAll().stream().map(this::toDto).toList();
    }

    private CouponDto toDto(Coupon c) {
        CouponDto dto = new CouponDto();
        dto.setId(c.getId()); dto.setName(c.getName()); dto.setCode(c.getCode());
        dto.setDiscount(c.getDiscount()); dto.setExpirationDate(c.getExpirationDate());
        return dto;
    }
}
