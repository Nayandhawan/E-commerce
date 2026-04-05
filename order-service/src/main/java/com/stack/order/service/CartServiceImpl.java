package com.stack.order.service;

import com.stack.order.client.ProductServiceClient;
import com.stack.order.dto.*;
import com.stack.order.entity.*;
import com.stack.order.enums.OrderStatus;
import com.stack.order.exception.ValidationException;
import com.stack.order.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl {

    private final OrderRepository orderRepository;
    private final CartItemsRepository cartItemsRepository;
    private final CouponRepository couponRepository;
    private final ProductServiceClient productServiceClient;

    public CartServiceImpl(OrderRepository orderRepository, CartItemsRepository cartItemsRepository,
                           CouponRepository couponRepository, ProductServiceClient productServiceClient) {
        this.orderRepository = orderRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.couponRepository = couponRepository;
        this.productServiceClient = productServiceClient;
    }

    public ResponseEntity<?> addProductToCart(AddProductInCartDto dto) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(dto.getUserId(), OrderStatus.PENDING);
        if (activeOrder == null) {
            activeOrder = new Order();
            activeOrder.setUserId(dto.getUserId());
            activeOrder.setOrderStatus(OrderStatus.PENDING);
            activeOrder.setTotalAmount(0L);
            activeOrder.setAmount(0L);
            activeOrder.setDiscount(0L);
            activeOrder = orderRepository.save(activeOrder);
        }

        Optional<CartItems> existing = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                dto.getProductId(), activeOrder.getId(), dto.getUserId());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already in cart");
        }

        ProductPriceDto product;
        try { product = productServiceClient.getProduct(dto.getProductId()); }
        catch (Exception e) { return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Product service unavailable"); }

        if (!product.isExists()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");

        CartItems item = new CartItems();
        item.setProductId(dto.getProductId());
        item.setPrice(product.getPrice());
        item.setQuantity(1L);
        item.setUserId(dto.getUserId());
        item.setOrder(activeOrder);
        cartItemsRepository.save(item);

        activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());
        activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
        orderRepository.save(activeOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(toOrderDto(activeOrder));
    }

    public OrderDto getCartByUserId(Long userId) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        if (activeOrder == null) return new OrderDto();
        return toOrderDto(activeOrder);
    }

    public OrderDto applyCoupon(Long userId, String code) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        Coupon coupon = couponRepository.findByCode(code)
                .orElseThrow(() -> new ValidationException("Coupon not found"));
        if (coupon.getExpirationDate() != null && new Date().after(coupon.getExpirationDate()))
            throw new ValidationException("Coupon has expired");
        double discount = (coupon.getDiscount() / 100.0) * activeOrder.getTotalAmount();
        activeOrder.setAmount((long) (activeOrder.getTotalAmount() - discount));
        activeOrder.setDiscount((long) discount);
        activeOrder.setCoupon(coupon);
        return toOrderDto(orderRepository.save(activeOrder));
    }

    public OrderDto increaseProductQuantity(AddProductInCartDto dto) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(dto.getUserId(), OrderStatus.PENDING);
        Optional<CartItems> optItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                dto.getProductId(), activeOrder.getId(), dto.getUserId());
        if (optItem.isEmpty()) return null;
        ProductPriceDto product = productServiceClient.getProduct(dto.getProductId());
        CartItems item = optItem.get();
        item.setQuantity(item.getQuantity() + 1);
        cartItemsRepository.save(item);
        activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
        activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());
        reapplyCouponDiscount(activeOrder);
        return toOrderDto(orderRepository.save(activeOrder));
    }

    public OrderDto decreaseProductQuantity(AddProductInCartDto dto) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(dto.getUserId(), OrderStatus.PENDING);
        Optional<CartItems> optItem = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                dto.getProductId(), activeOrder.getId(), dto.getUserId());
        if (optItem.isEmpty()) return null;
        ProductPriceDto product = productServiceClient.getProduct(dto.getProductId());
        CartItems item = optItem.get();
        item.setQuantity(item.getQuantity() - 1);
        cartItemsRepository.save(item);
        activeOrder.setAmount(activeOrder.getAmount() - product.getPrice());
        activeOrder.setTotalAmount(activeOrder.getTotalAmount() - product.getPrice());
        reapplyCouponDiscount(activeOrder);
        return toOrderDto(orderRepository.save(activeOrder));
    }

    public OrderDto placeOrder(PlaceOrderDto dto) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(dto.getUserId(), OrderStatus.PENDING);
        activeOrder.setOrderDescription(dto.getOrderDescription());
        activeOrder.setAddress(dto.getAddress());
        activeOrder.setDate(new Date());
        activeOrder.setOrderStatus(OrderStatus.PLACED);
        if (dto.getRazorpayPaymentId() != null) activeOrder.setRazorpayPaymentId(dto.getRazorpayPaymentId());
        activeOrder.setTrackingId(UUID.randomUUID());
        orderRepository.save(activeOrder);

        Order newPending = new Order();
        newPending.setUserId(dto.getUserId());
        newPending.setOrderStatus(OrderStatus.PENDING);
        newPending.setAmount(0L); newPending.setTotalAmount(0L); newPending.setDiscount(0L);
        orderRepository.save(newPending);
        return toOrderDto(activeOrder);
    }

    public List<OrderDto> getPlacedOrders(Long userId) {
        return orderRepository.findByUserIdAndOrderStatusIn(userId,
                List.of(OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED))
                .stream().map(this::toOrderDto).toList();
    }

    public OrderDto getOrderById(Long orderId) {
        return orderRepository.findById(orderId).map(this::toOrderDto).orElse(null);
    }

    public OrderDto searchByTrackingId(UUID trackingId) {
        return orderRepository.findByTrackingId(trackingId).map(this::toOrderDto).orElse(null);
    }

    private void reapplyCouponDiscount(Order order) {
        if (order.getCoupon() != null) {
            double discount = (order.getCoupon().getDiscount() / 100.0) * order.getTotalAmount();
            order.setAmount((long) (order.getTotalAmount() - discount));
            order.setDiscount((long) discount);
        }
    }

    private OrderDto toOrderDto(Order o) {
        OrderDto dto = new OrderDto();
        dto.setId(o.getId());
        dto.setOrderDescription(o.getOrderDescription());
        dto.setDate(o.getDate());
        dto.setAmount(o.getAmount());
        dto.setAddress(o.getAddress());
        dto.setOrderStatus(o.getOrderStatus());
        dto.setTotalAmount(o.getTotalAmount());
        dto.setDiscount(o.getDiscount());
        dto.setTrackingId(o.getTrackingId());
        dto.setUserName("User #" + o.getUserId());
        if (o.getCoupon() != null) dto.setCouponName(o.getCoupon().getName());
        if (o.getCartItems() != null) {
            dto.setCartItems(o.getCartItems().stream().map(i -> {
                CartItemsDto c = new CartItemsDto();
                c.setId(i.getId()); c.setProductId(i.getProductId());
                c.setPrice(i.getPrice()); c.setQuantity(i.getQuantity()); c.setUserId(i.getUserId());
                try { c.setProductName(productServiceClient.getProduct(i.getProductId()).getName()); }
                catch (Exception e) { c.setProductName("Product #" + i.getProductId()); }
                return c;
            }).toList());
        }
        return dto;
    }
}
