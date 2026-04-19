package com.stack.ecom.services.admin.coupon;

import com.stack.ecom.entity.Coupon;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminCouponServiceImpl implements AdminCouponService{

    private final CouponRepository couponRepository;

    public AdminCouponServiceImpl(CouponRepository couponRepository){
        this.couponRepository = couponRepository;
    }

    public Coupon createCoupon(Coupon coupon){
        if (couponRepository.existsByCode(coupon.getCode())){
            throw new ValidationException("Coupon Code Already Exist.");
        }
        return couponRepository.save(coupon);
    }

    public List<Coupon> getAllCoupons(){
        return couponRepository.findAll();
    }

    public Coupon updateCoupon(Long id, Coupon coupon){
        Coupon existing = couponRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Coupon not found"));
        existing.setName(coupon.getName());
        existing.setCode(coupon.getCode());
        existing.setDiscount(coupon.getDiscount());
        existing.setExpirationDate(coupon.getExpirationDate());
        return couponRepository.save(existing);
    }

    public List<Coupon> getCouponsByMonthAndYear(int month, int year){
        return couponRepository.findByMonthAndYear(month, year);
    }

    public void deleteCoupon(Long id){
        couponRepository.deleteById(id);
    }
}
