package com.stack.ecom.services.customer.cart;

import com.stack.ecom.dto.AddProductInCartDto;
import com.stack.ecom.dto.CartItemsDto;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.PlaceOrderDto;
import com.stack.ecom.entity.*;
import com.stack.ecom.enums.CouponType;
import com.stack.ecom.enums.OrderStatus;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.*;
import com.stack.ecom.services.email.EmailService;
import com.stack.ecom.services.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CartItemsRepository cartItemsRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private CouponRepository couponRepository;
    @Autowired private NotificationService notificationService;
    @Autowired private EmailService emailService;

    @Transactional
    public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
        Order activeOrder = orderRepository.findFirstByUserIdAndOrderStatus(
                addProductInCartDto.getUserId(), OrderStatus.PENDING);

        if (activeOrder == null) {
            Optional<User> optionalUser = userRepository.findById(addProductInCartDto.getUserId());
            if (optionalUser.isPresent()) {
                activeOrder = new Order();
                activeOrder.setUser(optionalUser.get());
                activeOrder.setOrderStatus(OrderStatus.PENDING);
                activeOrder.setTotalAmount(0L);
                activeOrder.setAmount(0L);
                activeOrder = orderRepository.save(activeOrder);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        }

        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId());

        if (optionalCartItems.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists in the cart.");
        }

        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        if (optionalProduct.isPresent()) {
            CartItems cartItems = new CartItems();
            cartItems.setProduct(optionalProduct.get());
            cartItems.setPrice(optionalProduct.get().getPrice());
            cartItems.setQuantity(1L);
            cartItems.setUser(activeOrder.getUser());
            cartItems.setOrder(activeOrder);

            CartItems updatedCart = cartItemsRepository.save(cartItems);
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cartItems.getPrice());
            activeOrder.setAmount(activeOrder.getAmount() + cartItems.getPrice());
            orderRepository.save(activeOrder);

            return ResponseEntity.status(HttpStatus.CREATED).body(updatedCart.cartItemsDto());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Not Found");
        }
    }

    @Transactional(readOnly = true)
    public OrderDto getCartByUserId(Long userId) {
        List<Order> pending = orderRepository.findByUserIdAndOrderStatusWithItems(userId, OrderStatus.PENDING);
        Order activeOrder = pending.isEmpty() ? null : pending.get(0);
        if (activeOrder == null) {
            OrderDto empty = new OrderDto();
            empty.setCartItems(Collections.emptyList());
            return empty;
        }
        List<CartItemsDto> cartItemsDtoList = activeOrder.getCartItems() != null
                ? activeOrder.getCartItems().stream().map(CartItems::cartItemsDto).toList()
                : Collections.emptyList();
        OrderDto orderDto = new OrderDto();
        orderDto.setAmount(activeOrder.getAmount());
        orderDto.setId(activeOrder.getId());
        orderDto.setOrderStatus(activeOrder.getOrderStatus());
        orderDto.setDiscount(activeOrder.getDiscount());
        orderDto.setTotalAmount(activeOrder.getTotalAmount());
        orderDto.setCartItems(cartItemsDtoList);
        if (activeOrder.getCoupon() != null) {
            Coupon coupon = activeOrder.getCoupon();
            orderDto.setCouponName(coupon.getName());
            List<Long> discountedProductIds = activeOrder.getCartItems() != null
                    ? activeOrder.getCartItems().stream()
                        .filter(item -> isItemEligible(item, coupon))
                        .map(item -> item.getProduct().getId())
                        .collect(Collectors.toList())
                    : Collections.emptyList();
            orderDto.setDiscountedProductIds(discountedProductIds);
        }
        return orderDto;
    }

    @Transactional
    public OrderDto applyCoupon(Long userId, String code) {
        List<Order> pending = orderRepository.findByUserIdAndOrderStatusWithItems(userId, OrderStatus.PENDING);
        Order activeOrder = pending.isEmpty() ? null : pending.get(0);
        if (activeOrder == null) throw new ValidationException("No active cart found");

        Coupon coupon = couponRepository.findByCode(code)
                .orElseThrow(() -> new ValidationException("Coupon not found"));
        if (couponIsExpired(coupon)) throw new ValidationException("Coupon has Expired");

        List<CartItems> eligibleItems = activeOrder.getCartItems() != null
                ? activeOrder.getCartItems().stream()
                    .filter(item -> isItemEligible(item, coupon))
                    .collect(Collectors.toList())
                : Collections.emptyList();

        if (eligibleItems.isEmpty()) throw new ValidationException("No eligible products in your cart for this coupon");

        long eligibleSubtotal = eligibleItems.stream()
                .mapToLong(item -> item.getPrice() * item.getQuantity())
                .sum();

        if (coupon.getMinOrderAmount() != null && eligibleSubtotal < coupon.getMinOrderAmount()) {
            throw new ValidationException("Minimum order amount of ₹" + coupon.getMinOrderAmount() + " required for this coupon");
        }

        long discountAmount = Math.round((coupon.getDiscount() / 100.0) * eligibleSubtotal);
        if (coupon.getCouponType() == CouponType.CAPPED_PERCENTAGE && coupon.getMaxDiscount() != null) {
            discountAmount = Math.min(discountAmount, coupon.getMaxDiscount());
        }

        activeOrder.setAmount(activeOrder.getTotalAmount() - discountAmount);
        activeOrder.setDiscount(discountAmount);
        activeOrder.setCoupon(coupon);
        orderRepository.save(activeOrder);

        return activeOrder.getOrderDto();
    }

    @Transactional
    public OrderDto removeCoupon(Long userId) {
        List<Order> pending = orderRepository.findByUserIdAndOrderStatusWithItems(userId, OrderStatus.PENDING);
        Order activeOrder = pending.isEmpty() ? null : pending.get(0);
        if (activeOrder == null) throw new ValidationException("No active cart found");

        activeOrder.setCoupon(null);
        activeOrder.setAmount(activeOrder.getTotalAmount());
        activeOrder.setDiscount(0L);
        orderRepository.save(activeOrder);
        return activeOrder.getOrderDto();
    }

    @Transactional
    public OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        Order activeOrder = orderRepository.findFirstByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.PENDING);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId());

        if (optionalProduct.isPresent() && optionalCartItems.isPresent()) {
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();
            if (product.getPrice() == null) throw new IllegalArgumentException("Product price is missing.");

            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());
            cartItems.setQuantity(cartItems.getQuantity() + 1);

            if (activeOrder.getCoupon() != null) {
                recalculateDiscount(activeOrder);
            } else {
                activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            }

            cartItemsRepository.save(cartItems);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }
        return null;
    }

    @Transactional
    public OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        Order activeOrder = orderRepository.findFirstByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.PENDING);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId());

        if (optionalProduct.isPresent() && optionalCartItems.isPresent()) {
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();
            if (product.getPrice() == null) throw new IllegalArgumentException("Product price is missing.");

            activeOrder.setTotalAmount(activeOrder.getTotalAmount() - product.getPrice());
            cartItems.setQuantity(cartItems.getQuantity() - 1);

            if (activeOrder.getCoupon() != null) {
                recalculateDiscount(activeOrder);
            } else {
                activeOrder.setAmount(activeOrder.getAmount() - product.getPrice());
            }

            cartItemsRepository.save(cartItems);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }
        return null;
    }

    @Transactional
    public OrderDto placeOrder(PlaceOrderDto placeOrderDto) {
        List<Order> pending = orderRepository.findByUserIdAndOrderStatusWithItems(placeOrderDto.getUserId(), OrderStatus.PENDING);
        Order activeOrder = pending.isEmpty() ? null : pending.get(0);
        Optional<User> optionalUser = userRepository.findById(placeOrderDto.getUserId());
        if (optionalUser.isPresent()) {
            activeOrder.setOrderDescription(placeOrderDto.getOrderDescription());
            activeOrder.setDeliveryStreet(placeOrderDto.getStreet());
            activeOrder.setDeliveryCity(placeOrderDto.getCity());
            activeOrder.setDeliveryState(placeOrderDto.getState());
            activeOrder.setDeliveryZipCode(placeOrderDto.getZipCode());
            activeOrder.setDeliveryCountry(placeOrderDto.getCountry());
            String addr = placeOrderDto.getAddress() != null ? placeOrderDto.getAddress() : buildAddress(placeOrderDto);
            activeOrder.setAddress(addr);
            activeOrder.setDate(new Date());
            activeOrder.setOrderStatus(OrderStatus.PLACED);
            activeOrder.setTrackingId(UUID.randomUUID());
            orderRepository.save(activeOrder);

            if (activeOrder.getCartItems() != null) {
                for (CartItems item : activeOrder.getCartItems()) {
                    Product product = item.getProduct();
                    long newStock = Math.max(0, product.getStockQuantity() - item.getQuantity());
                    product.setStockQuantity(newStock);
                    productRepository.save(product);
                }
            }

            notificationService.create(placeOrderDto.getUserId(), "Your order has been placed successfully!");
            User user = optionalUser.get();
            emailService.sendOrderConfirmation(user.getEmail(), user.getName(), activeOrder);

            Order order = new Order();
            order.setAmount(0L);
            order.setTotalAmount(0L);
            order.setDiscount(0L);
            order.setUser(optionalUser.get());
            order.setOrderStatus(OrderStatus.PENDING);
            orderRepository.save(order);

            return activeOrder.getOrderDto();
        }
        return null;
    }

    public List<OrderDto> getPlacedOrder(Long userId) {
        return orderRepository.findByUserIdAndOrderStatusIn(userId, List.of(
                OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED,
                OrderStatus.CANCELLED, OrderStatus.RETURN_REQUESTED, OrderStatus.RETURNED))
            .stream().map(Order::getOrderDto).collect(Collectors.toList());
    }

    public OrderDto searchOrderByTrackingId(UUID trackingId) {
        return orderRepository.findByTrackingId(trackingId).map(Order::getOrderDto).orElse(null);
    }

    public ResponseEntity<?> cancelOrder(Long userId, Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findByIdAndUserId(orderId, userId);
        if (optionalOrder.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        Order order = optionalOrder.get();
        if (order.getOrderStatus() == OrderStatus.SHIPPED || order.getOrderStatus() == OrderStatus.DELIVERED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order cannot be cancelled after it has been shipped");
        if (order.getOrderStatus() == OrderStatus.CANCELLED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order is already cancelled");
        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        notificationService.create(userId, "Your order #" + orderId + " has been cancelled.");
        return ResponseEntity.ok(order.getOrderDto());
    }

    public ResponseEntity<?> requestReturn(Long userId, Long orderId, String reason) {
        Optional<Order> optionalOrder = orderRepository.findByIdAndUserId(orderId, userId);
        if (optionalOrder.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        Order order = optionalOrder.get();
        if (order.getOrderStatus() != OrderStatus.DELIVERED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only delivered orders can be returned");
        order.setOrderStatus(OrderStatus.RETURN_REQUESTED);
        order.setReturnReason(reason);
        orderRepository.save(order);
        notificationService.create(userId, "Your return request for order #" + orderId + " has been submitted.");
        return ResponseEntity.ok(order.getOrderDto());
    }

    @Transactional
    public OrderDto removeFromCart(Long userId, Long productId) {
        List<Order> pending = orderRepository.findByUserIdAndOrderStatusWithItems(userId, OrderStatus.PENDING);
        Order activeOrder = pending.isEmpty() ? null : pending.get(0);
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                productId, activeOrder.getId(), userId);

        if (optionalCartItems.isPresent()) {
            CartItems cartItem = optionalCartItems.get();
            long itemTotal = cartItem.getPrice() * cartItem.getQuantity();
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() - itemTotal);

            if (activeOrder.getCoupon() != null) {
                activeOrder.getCartItems().remove(cartItem);
                cartItemsRepository.delete(cartItem);
                recalculateDiscount(activeOrder);
            } else {
                activeOrder.setAmount(activeOrder.getAmount() - itemTotal);
                activeOrder.getCartItems().remove(cartItem);
                cartItemsRepository.delete(cartItem);
            }
            orderRepository.save(activeOrder);
        }
        return activeOrder.getOrderDto();
    }

    private boolean isItemEligible(CartItems item, Coupon coupon) {
        boolean noTargeting = (coupon.getApplicableCategories() == null || coupon.getApplicableCategories().isEmpty())
                && (coupon.getApplicableProducts() == null || coupon.getApplicableProducts().isEmpty());
        if (noTargeting) return true;

        Long productId = item.getProduct().getId();
        Long categoryId = item.getProduct().getCategory() != null ? item.getProduct().getCategory().getId() : null;

        boolean inCategory = coupon.getApplicableCategories() != null && !coupon.getApplicableCategories().isEmpty()
                && categoryId != null
                && coupon.getApplicableCategories().stream().anyMatch(c -> c.getId().equals(categoryId));
        boolean inProducts = coupon.getApplicableProducts() != null && !coupon.getApplicableProducts().isEmpty()
                && coupon.getApplicableProducts().stream().anyMatch(p -> p.getId().equals(productId));

        return inCategory || inProducts;
    }

    private void recalculateDiscount(Order activeOrder) {
        Coupon coupon = activeOrder.getCoupon();
        if (coupon == null) return;

        long eligibleSubtotal = activeOrder.getCartItems().stream()
                .filter(item -> isItemEligible(item, coupon))
                .mapToLong(item -> item.getPrice() * item.getQuantity())
                .sum();

        long discountAmount = Math.round((coupon.getDiscount() / 100.0) * eligibleSubtotal);
        if (coupon.getCouponType() == CouponType.CAPPED_PERCENTAGE && coupon.getMaxDiscount() != null) {
            discountAmount = Math.min(discountAmount, coupon.getMaxDiscount());
        }

        activeOrder.setAmount(activeOrder.getTotalAmount() - discountAmount);
        activeOrder.setDiscount(discountAmount);
    }

    private String buildAddress(PlaceOrderDto dto) {
        return String.join(", ",
            nullSafe(dto.getStreet()), nullSafe(dto.getCity()),
            nullSafe(dto.getState()), nullSafe(dto.getZipCode()),
            nullSafe(dto.getCountry())).replaceAll("(, )+", ", ").strip();
    }

    private String nullSafe(String s) { return s != null ? s : ""; }

    private boolean couponIsExpired(Coupon coupon) {
        Date currentDate = new Date();
        Date expirationDate = coupon.getExpirationDate();
        return expirationDate != null && currentDate.after(expirationDate);
    }
}
