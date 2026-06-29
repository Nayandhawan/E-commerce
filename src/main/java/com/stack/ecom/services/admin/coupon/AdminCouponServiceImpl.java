package com.stack.ecom.services.admin.coupon;

import com.stack.ecom.dto.CouponDto;
import com.stack.ecom.entity.Category;
import com.stack.ecom.entity.Coupon;
import com.stack.ecom.entity.Product;
import com.stack.ecom.enums.CouponType;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.CategoryRepository;
import com.stack.ecom.repository.CouponRepository;
import com.stack.ecom.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminCouponServiceImpl implements AdminCouponService {

    private final CouponRepository couponRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public AdminCouponServiceImpl(CouponRepository couponRepository,
                                   CategoryRepository categoryRepository,
                                   ProductRepository productRepository) {
        this.couponRepository = couponRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public CouponDto createCoupon(CouponDto dto) {
        if (couponRepository.existsByCode(dto.getCode())) {
            throw new ValidationException("Coupon Code Already Exist.");
        }
        Coupon coupon = toEntity(dto, new Coupon());
        return toDto(couponRepository.save(coupon));
    }

    @Transactional(readOnly = true)
    public List<CouponDto> getAllCoupons() {
        return couponRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public CouponDto updateCoupon(Long id, CouponDto dto) {
        Coupon existing = couponRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Coupon not found"));
        toEntity(dto, existing);
        return toDto(couponRepository.save(existing));
    }

    @Transactional(readOnly = true)
    public List<CouponDto> getCouponsByMonthAndYear(int month, int year) {
        return couponRepository.findByMonthAndYear(month, year).stream().map(this::toDto).collect(Collectors.toList());
    }

    public void deleteCoupon(Long id) {
        couponRepository.deleteById(id);
    }

    private Coupon toEntity(CouponDto dto, Coupon coupon) {
        coupon.setName(dto.getName());
        coupon.setCode(dto.getCode());
        coupon.setDiscount(dto.getDiscount());
        coupon.setExpirationDate(dto.getExpirationDate());
        coupon.setCouponType(dto.getCouponType() != null ? dto.getCouponType() : CouponType.PERCENTAGE);
        coupon.setMaxDiscount(dto.getMaxDiscount());
        coupon.setMinOrderAmount(dto.getMinOrderAmount());

        List<Category> categories = new ArrayList<>();
        if (dto.getApplicableCategoryIds() != null) {
            for (Long catId : dto.getApplicableCategoryIds()) {
                categoryRepository.findById(catId).ifPresent(categories::add);
            }
        }
        coupon.setApplicableCategories(categories);

        List<Product> products = new ArrayList<>();
        if (dto.getApplicableProductIds() != null) {
            for (Long prodId : dto.getApplicableProductIds()) {
                productRepository.findById(prodId).ifPresent(products::add);
            }
        }
        coupon.setApplicableProducts(products);

        return coupon;
    }

    private CouponDto toDto(Coupon coupon) {
        CouponDto dto = new CouponDto();
        dto.setId(coupon.getId());
        dto.setName(coupon.getName());
        dto.setCode(coupon.getCode());
        dto.setDiscount(coupon.getDiscount());
        dto.setExpirationDate(coupon.getExpirationDate());
        dto.setCouponType(coupon.getCouponType());
        dto.setMaxDiscount(coupon.getMaxDiscount());
        dto.setMinOrderAmount(coupon.getMinOrderAmount());
        dto.setApplicableCategoryIds(
            coupon.getApplicableCategories().stream().map(Category::getId).collect(Collectors.toList()));
        dto.setApplicableProductIds(
            coupon.getApplicableProducts().stream().map(Product::getId).collect(Collectors.toList()));
        return dto;
    }
}
