package com.stack.ecom.services.admin.coupon;

import com.stack.ecom.entity.Coupon;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
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
        else {
            return couponRepository.save(coupon);
        }
    }

    public List<Coupon> getAllCoupons(){
        return couponRepository.findAll();
    }
}
