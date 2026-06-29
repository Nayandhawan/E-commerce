package com.stack.ecom.controller.admin;

import com.stack.ecom.dto.CouponDto;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.services.admin.coupon.AdminCouponService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/coupons")
public class AdminCouponController {

    private final AdminCouponService adminCouponService;

    public AdminCouponController(AdminCouponService adminCouponService){
        this.adminCouponService = adminCouponService;
    }

    @PostMapping
    public ResponseEntity<?> createCoupon(@RequestBody CouponDto couponDto){
        try {
            return ResponseEntity.ok(adminCouponService.createCoupon(couponDto));
        } catch (ValidationException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<CouponDto>> getAllCoupons(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year){
        if (month != null && year != null) {
            return ResponseEntity.ok(adminCouponService.getCouponsByMonthAndYear(month, year));
        }
        return ResponseEntity.ok(adminCouponService.getAllCoupons());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(@PathVariable Long id, @RequestBody CouponDto couponDto){
        try {
            return ResponseEntity.ok(adminCouponService.updateCoupon(id, couponDto));
        } catch (ValidationException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id){
        adminCouponService.deleteCoupon(id);
        return ResponseEntity.noContent().build();
    }
}
