package com.stack.ecom.services.customer.wishlist;

import com.stack.ecom.dto.WishlistDto;

import java.util.List;

public interface WishlistService {

    WishlistDto addProductToWishlist(WishlistDto wishlistDto);

    List<WishlistDto> getWishlistByUserId(Long userId);

    void removeFromWishlist(Long userId, Long productId);
}
