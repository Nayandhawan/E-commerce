package com.stack.ecom.repository;

import com.stack.ecom.dto.WishlistDto;
import com.stack.ecom.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist,Long> {

    boolean existsByProductIdAndUserId(Long productId, Long userId);

    List<Wishlist> findAllByUserId(Long userId);

    void deleteByProductIdAndUserId(Long productId, Long userId);
}
