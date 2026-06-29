package com.stack.ecom.services.customer.cart;

import com.stack.ecom.dto.AddProductInCartDto;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.PlaceOrderDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface CartService {

    ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto);

    OrderDto getCartByUserId(Long userId);

    OrderDto applyCoupon(Long userId, String code);

    OrderDto removeCoupon(Long userId);

    OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto);

    OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto);

    OrderDto placeOrder(PlaceOrderDto placeOrderDto);

    List<OrderDto> getPlacedOrder(Long userId);

    OrderDto searchOrderByTrackingId(UUID trackingId);

    OrderDto removeFromCart(Long userId, Long productId);

    ResponseEntity<?> cancelOrder(Long userId, Long orderId);

    ResponseEntity<?> requestReturn(Long userId, Long orderId, String reason);
}
