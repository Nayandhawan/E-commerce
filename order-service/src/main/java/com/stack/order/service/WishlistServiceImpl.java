package com.stack.order.service;

import com.stack.order.client.ProductServiceClient;
import com.stack.order.dto.ProductPriceDto;
import com.stack.order.dto.WishlistDto;
import com.stack.order.entity.Wishlist;
import com.stack.order.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistServiceImpl {

    private final WishlistRepository wishlistRepository;
    private final ProductServiceClient productServiceClient;

    public WishlistServiceImpl(WishlistRepository wishlistRepository, ProductServiceClient productServiceClient) {
        this.wishlistRepository = wishlistRepository;
        this.productServiceClient = productServiceClient;
    }

    public WishlistDto addToWishlist(Long userId, Long productId) {
        if (wishlistRepository.findByProductIdAndUserId(productId, userId).isPresent())
            return toDto(wishlistRepository.findByProductIdAndUserId(productId, userId).get());
        Wishlist w = new Wishlist();
        w.setUserId(userId); w.setProductId(productId);
        return toDto(wishlistRepository.save(w));
    }

    public List<WishlistDto> getWishlistByUser(Long userId) {
        return wishlistRepository.findAllByUserId(userId).stream().map(this::toDto).toList();
    }

    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.findByProductIdAndUserId(productId, userId).ifPresent(wishlistRepository::delete);
    }

    private WishlistDto toDto(Wishlist w) {
        WishlistDto dto = new WishlistDto();
        dto.setId(w.getId()); dto.setProductId(w.getProductId()); dto.setUserId(w.getUserId());
        try {
            ProductPriceDto p = productServiceClient.getProduct(w.getProductId());
            dto.setProductName(p.getName()); dto.setPrice(p.getPrice());
        } catch (Exception e) { dto.setProductName("Product #" + w.getProductId()); }
        return dto;
    }
}
