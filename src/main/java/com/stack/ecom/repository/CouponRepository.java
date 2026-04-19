package com.stack.ecom.repository;

import com.stack.ecom.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    boolean existsByCode(String code);

    Optional<Coupon> findByCode(String code);

    @Query("SELECT c FROM Coupon c WHERE MONTH(c.expirationDate) = :month AND YEAR(c.expirationDate) = :year")
    List<Coupon> findByMonthAndYear(@Param("month") int month, @Param("year") int year);
}
