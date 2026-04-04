package com.stack.order.controller;

import com.stack.order.dto.CouponDto;
import com.stack.order.service.CouponServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/coupons")
public class AdminCouponController {
    private final CouponServiceImpl couponService;
    public AdminCouponController(CouponServiceImpl couponService) { this.couponService = couponService; }

    @PostMapping
    public ResponseEntity<CouponDto> create(@RequestBody CouponDto dto) {
        return ResponseEntity.ok(couponService.createCoupon(dto));
    }

    @GetMapping
    public ResponseEntity<List<CouponDto>> getAll() {
        return ResponseEntity.ok(couponService.getAllCoupons());
    }
}
